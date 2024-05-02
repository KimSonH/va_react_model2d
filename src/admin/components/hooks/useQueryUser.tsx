import { useQuery } from 'react-query'

import { getAdminFromLocalStorage } from './useQueryAdmin'

import type { ResponsiveTypeData } from '@admin/types/common'
import type { UserSearchQuery, UsersResponse } from '@admin/types/users'

import { UrlApi } from '@admin/config'
import axiosInstance from '@admin/config/axiosInstance'
import { userQueryListId, usersQueryKey } from '@admin/types/users'

const getUsers = async (params: UserSearchQuery) => {
  const { data } = await axiosInstance.get<ResponsiveTypeData<UsersResponse>>(UrlApi.USER, {
    params
  })

  return data
}

export const useQueryUsers = (params: UserSearchQuery) => {
  const admin = getAdminFromLocalStorage()

  const { data, refetch } = useQuery(
    [admin, usersQueryKey, params.page, params.search, params.limit, params.search],
    () => getUsers(params),
    {
      keepPreviousData: true
    }
  )

  return { users: data?.data, refetch }
}

const getUserByListId = async (listData: string[]) => {
  const { data } = await axiosInstance.post<ResponsiveTypeData<UsersResponse>>(UrlApi.GET_MANY_USER, { id: listData })
  return data
}

export const useQueryUserByListId = (listData: string[]) => {
  const { data, remove } = useQuery([userQueryListId, listData.join()], () => getUserByListId(listData))

  return { users: data?.data?.items, remove }
}
