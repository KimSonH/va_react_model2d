import { useEffect, useState } from 'react'

import { useRecoilValue } from 'recoil'
import { io } from 'socket.io-client'

import { useQueryMessage } from './useQueryMessage'

import type { UserAttendances } from '@client/types/attendance'
import type { Messages } from '@client/types/conversation'
import type { Socket } from 'socket.io-client'

import { messagesSearchQueryState } from '@client/states/Messages'

export const useWebsocket = (socketUrl: string) => {
  const [socket, setSocket] = useState<Socket>()
  const messagesParams = useRecoilValue(messagesSearchQueryState)
  const { messages } = useQueryMessage(messagesParams)
  const [conversationMessages, setConversationMessages] = useState<Messages[]>(messages?.items || [])
  const [messageVoice, setMessageVoice] = useState<string>('')

  const [isPending, setIsPending] = useState(false)
  const [face, setFace] = useState<UserAttendances>()

  const [isLoading, setIsLoading] = useState(false);
  const [callApiMessage, setCallApiMessage] = useState(false);
  const [offerer, setOfferer] = useState<string>()

  useEffect(() => {
    const socketRef = io(socketUrl, {
      transports: ['websocket']
    })
    setSocket(socketRef)

    return () => {
      socketRef.disconnect()
    }
  }, [socketUrl])

  useEffect(() => {
    if (messages?.items && isLoading) {
      setConversationMessages((conversation) => [
        ...conversation,
        ...messages?.items
      ])
      setIsLoading(false)
    } else if (messages?.items && messages?.items?.length === 0) {
      setCallApiMessage(false)
    }
  }, [messages, isLoading])

  useEffect(() => {
    function onConnect() {
      if (messages?.items) setCallApiMessage(true)
    }
    function handleAIResponse(data: { message: string; created_at: string }) {

      setMessageVoice(data.message)
      setIsPending(false)
      setConversationMessages((messages) => [
        {
          message: data.message,
          isBot: true,
          created_at: data.created_at,
          type: 'text'
        },
        ...messages
      ])
    }

    function handle3DModelVoice(data: string) {
      setMessageVoice(data)
    }

    function handleFaceReg(data: UserAttendances) {
      setFace(data)
    }

    function checkIsMessage(data: any) {
      setIsPending(!!data)
    }

    function handleWebRTCHello(id: string, force: boolean) {
      if (force) {
        setOfferer(undefined)
      }

      if (offerer !== id) {
        setOfferer(id)
      }
    }

    socket?.on('connect', onConnect)

    socket?.on('AIResponse', handleAIResponse)

    socket?.on('3dModelVoice', handle3DModelVoice)

    socket?.on('faceReg', handleFaceReg)

    socket?.on('isMessage', checkIsMessage)

    socket?.on('webrtcHello', handleWebRTCHello)

    return () => {
      socket?.off('AIResponse', handleAIResponse)
      socket?.off('3dModelVoice', handle3DModelVoice)
      socket?.off('faceReg', handleFaceReg)
      socket?.off('isMessage', checkIsMessage)
      socket?.off('webrtcHello', handleWebRTCHello)
    }
  }, [socket, offerer, messages])

  return {
    socketRef: socket,
    conversationMessages,
    messageVoice,
    setConversationMessages,
    face,
    isPending,
    setIsPending,
    offerer,
    isLoading,
    setIsLoading,
    callApiMessage
  }
}
