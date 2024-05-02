import type { Dispatch, SetStateAction } from 'react'
import { useOutletContext } from 'react-router-dom'

import type { UserAttendances } from '@client/types/attendance'
import type { ConversationMessageType } from '@client/types/conversation'
import type { Socket } from 'socket.io-client'

type ContextHookType = {
  socketRef: Socket | undefined
  conversationMessages: ConversationMessageType[]
  messageVoice: string
  setConversationMessages: Dispatch<SetStateAction<ConversationMessageType[]>>
  face: UserAttendances
  isPending: boolean
  setIsPending: Dispatch<SetStateAction<boolean>>
  offerer: string | undefined
  isLoading: boolean
  callApiMessage: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export function useContextHook() {
  return useOutletContext<ContextHookType>()
}
