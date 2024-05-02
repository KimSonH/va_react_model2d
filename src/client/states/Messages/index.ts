import { atom, selector } from 'recoil'

import type { MessagesParamQuery } from '@client/types/conversation'

export const lastIdState = atom<string>({
  key: 'lastIdState',
  default: ''
})

export const messagesSearchQueryState = selector<MessagesParamQuery>({
  key: 'messagesSearchQueryState',
  get: ({ get }) => {
    const lastId = get(lastIdState)

    return {
      lastId
    }
  }
})
