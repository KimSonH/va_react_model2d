import { useQuery } from 'react-query'

import type { ResponsiveTypeData } from '@admin/types/common'
import type { MessageResponse, MessagesParamQuery } from '@client/types/conversation'

import { UrlApi } from '@admin/config'
import axiosInstance from '@client/config/axiosInstance'
import { useQueryMessagesKey } from '@client/types/conversation'

async function getMessages(params: MessagesParamQuery) {
  const { data } = await axiosInstance.get<ResponsiveTypeData<MessageResponse>>(UrlApi.GET_MESSAGE, {
    params: { last_id: params?.lastId }
  })

  return data.data
}

export const useQueryMessage = (params: MessagesParamQuery) => {
  const { data: messages, error, isFetching } = useQuery([useQueryMessagesKey, params?.lastId], () =>
    getMessages(params)
  )

  return { messages, error, isFetching }
}
