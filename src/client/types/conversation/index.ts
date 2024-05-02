export type ConversationMessageType = {
  id?: string
  message: string
  created_at: string
  isBot: boolean
}

export type Messages = {
  created_at: string
  message: string
  isBot: boolean
  type: string
}

export type MessageResponse = {
  items: Messages[]
  totalData: number
}

export type MessagesParamQuery = {
  lastId?: string
}

export const useQueryMessagesKey = 'messages'
