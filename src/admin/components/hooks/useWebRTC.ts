import { useState, useEffect, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { io } from 'socket.io-client'

import type { Socket } from 'socket.io-client'

import { webrtcUrl, webrtcTurnServer } from '@client/helper/function'

const defaultRTCConfiguration = {
  iceServers: [{ ...webrtcTurnServer() }]
}

export const useWebRTC = (root: string | undefined, offerer: string | undefined, wsUrl: string = webrtcUrl()) => {
  const { t } = useTranslation()
  const [socket, setSocket] = useState<Socket>()
  const [webrtc, setWebRTC] = useState<RTCPeerConnection>()
  const [isMakingOffer, setIsMakingOffer] = useState<boolean>()
  const [isPeerConnectionConfigured, setIsPeerConnectionConfigured] = useState<boolean>()
  const [isRemoteAnswerPending, setIsRemoteAnswerPending] = useState<boolean>()
  const [status, setStatus] = useState<string>(t('front.home.Face Recognition Video.wait_server'))
  const [error, setError] = useState<Error>()
  const [mediaStream, setMediaStream] = useState<MediaStream>()

  const resetVideo = () => {
    setMediaStream(undefined)
  }

  const resetState = useCallback(() => {
    resetVideo()
    if (webrtc) {
      webrtc.close()
      setWebRTC(undefined)
    }
    setIsPeerConnectionConfigured(false)
  }, [webrtc])

  const handleError = useCallback(
    (text: Error, reset = false) => {
      setError(text)
      if (reset) {
        resetState()
      }
    },
    [resetState]
  )

  const handleStatus = (text: string) => {
    // console.log(text)
    setStatus(text)
  }

  useEffect(() => {
    const socketRef =
      offerer && root
        ? io(wsUrl, {
          transports: ['websocket'],
          query: { root: root, role: 'requester' },
          forceNew: true
        })
        : undefined
    setSocket(socketRef)
    return () => {
      socketRef?.disconnect()
    }
  }, [offerer, root, wsUrl])

  useEffect(() => {
    const webrtcRef = new RTCPeerConnection(defaultRTCConfiguration)
    setWebRTC(webrtcRef)
    socket?.emit('sessionStart', offerer, (status: boolean) => {
      handleStatus(t('front.home.Face Recognition Video.request_slot'))
      if (status) {
        handleStatus(t('front.home.Face Recognition Video.request_video'))
        socket?.emit('offerRequest', offerer)
      } else {
        handleStatus(t('front.home.Face Recognition Video.wait_slot'))
      }
    })
    return () => {
      webrtcRef.close()
    }
  }, [socket])

  useEffect(() => {
    const configurePeerConnection = () => {
      if (webrtc) {
        webrtc.ontrack = ({ track, streams }) => {
          if (track.kind === 'video') setMediaStream(streams[0])
        }

        webrtc.onicecandidate = (event) => {
          // We have a candidate, send it to the remote party with the
          // same uuid
          if (event.candidate == null) {
            // console.log('ICE Candidate was null, done')
            return
          }
          socket?.emit('transfer', { to: offerer, json: { ice: event.candidate } })
        }

        webrtc.oniceconnectionstatechange = () => {
          if (webrtc?.iceConnectionState == 'connected') {
            // ICE gathering complete
            handleStatus(t('front.home.Face Recognition Video.wait_server'))
          }
        }

        // let the "negotiationneeded" event trigger offer generation
        webrtc.onnegotiationneeded = async () => {
          // Negotiation needed
          try {
            setIsMakingOffer(true)
            await webrtc?.setLocalDescription()
            const desc = webrtc?.localDescription
            socket?.emit('transfer', { to: offerer, json: { sdp: desc } })
          } catch (err) {
            handleError(err as Error, true)
          } finally {
            setIsMakingOffer(false)
          }
        }
      }
      setIsPeerConnectionConfigured(true)
    }

    const onIncomingSDP = (sdp: RTCSessionDescriptionInit) => {
      try {
        // An offer may come in while we are busy processing SRD(answer).
        // In this case, we will be in "stable" by the time the offer is processed
        // so it is safe to chain it on our Operations Chain now.
        const readyForOffer = !isMakingOffer && (webrtc?.signalingState === 'stable' || isRemoteAnswerPending)
        const offerCollision = sdp.type === 'offer' && !readyForOffer

        if (offerCollision) {
          return
        }
        setIsRemoteAnswerPending(sdp.type == 'answer')
        webrtc?.setRemoteDescription(sdp).then(() => {
          setIsRemoteAnswerPending(false)
          if (sdp.type == 'offer') {
            webrtc?.setLocalDescription().then(() => {
              const desc = webrtc?.localDescription
              socket?.emit('transfer', { to: offerer, json: { sdp: desc } })
              if (webrtc?.iceConnectionState == 'connected') {
                handleStatus(t('front.home.Face Recognition Video.wait_server'))
              }
            })
          }
        })
      } catch (err) {
        handleError(err as Error, true)
      }
    }

    const onIncomingICE = (ice: RTCIceCandidateInit) => {
      const candidate = new RTCIceCandidate(ice)
      webrtc?.addIceCandidate(candidate).catch(handleError)
    }

    const handleWebrtcTransfer = (data: {
      from: string
      json: { sdp?: RTCSessionDescriptionInit; ice?: RTCIceCandidateInit }
    }) => {
      // Handle incoming JSON SDP and ICE messages
      const msg = data.json

      // Incoming JSON signals the beginning of a call
      if (!isPeerConnectionConfigured) {
        configurePeerConnection()
      }

      if (msg.sdp) {
        onIncomingSDP(msg.sdp)
      } else if (msg.ice) {
        onIncomingICE(msg.ice)
      } else {
        handleError(new Error('Unknown incoming JSON: ' + msg))
      }
    }

    const handlePeerDisconnect = (id: string) => {
      handleStatus(t('front.home.Face Recognition Video.server_disconnected'))
      if (id === offerer) {
        socket?.disconnect()
      }
    }

    const handleDisconnect = () => {
      resetState()
    }

    socket?.on('transfer', handleWebrtcTransfer)
    socket?.on('peerDisconnect', handlePeerDisconnect)
    socket?.on('disconnect', handleDisconnect)

    return () => {
      socket?.off('transfer', handleWebrtcTransfer)
      socket?.off('peerDisconnect', handlePeerDisconnect)
      socket?.off('disconnect', handleDisconnect)
    }
  }, [socket, webrtc, isMakingOffer, isPeerConnectionConfigured, isRemoteAnswerPending, handleError, resetState])

  return {
    status,
    error,
    mediaStream
  }
}
