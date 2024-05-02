export type HelloData = {
  id: string
  role: string
  reason?: string
  available: string[]
}

export type NewPeerData = HelloData

export type SessionStartData = HelloData

export type OfferRequestFailData = {
  reason: string
}

export type PeerDisconnectData = HelloData

export type TransferData = {
  to: string
  message: {
    json: {
      ice?: Record<string, unknown>
      sdp?: RTCSessionDescriptionInit
    }
  }
  reason?: string
}
