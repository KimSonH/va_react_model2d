import { useMutation, useQueryClient } from 'react-query'

import { getAdminFromLocalStorage } from './useQueryAdmin'

import type { UserInput } from '@admin/schema/user/type'
import type { ResponsiveTypeData } from '@admin/types/common'
import type { ChangeActiveOfUser, UploadAvatar } from '@admin/types/users'
import type { AxiosError } from 'axios'
import type { UseMutationResult } from 'react-query'

import { UrlApi } from '@admin/config'
import axiosInstance from '@admin/config/axiosInstance'
import { usersQueryKey, type User, userQueryListId } from '@admin/types/users'

const createMany = async (formData: UserInput[]) => {
  const { data } = await axiosInstance.post<ResponsiveTypeData<User[]>>(UrlApi.CREATE_MANY_USER, formData)
  return data
}

export const useMutateCreateManyUser = (): UseMutationResult<
  ResponsiveTypeData<User[]>,
  AxiosError,
  UserInput[],
  undefined
> => {
  const queryClient = useQueryClient()
  const admin = getAdminFromLocalStorage()

  return useMutation(createMany, {
    onSuccess: (res) => {
      if (res.http_status === 200) {
        setTimeout(() => {
          queryClient.refetchQueries([admin, usersQueryKey])
        }, 500)
      }
    }
  })
}

const deleteMany = async (listId: string[]) => {
  const { data } = await axiosInstance.post<ResponsiveTypeData<User>>(UrlApi.DELETE_MANY_USER, { id: listId })
  return data
}

export const useMutateDeleteManyUser = (): UseMutationResult<
  ResponsiveTypeData<User>,
  AxiosError,
  string[],
  undefined
> => {
  const queryClient = useQueryClient()
  const admin = getAdminFromLocalStorage()

  return useMutation(deleteMany, {
    onSuccess: (res) => {
      if (res) {
        queryClient.removeQueries([userQueryListId])
        queryClient.refetchQueries([admin, usersQueryKey])
      }
    }
  })
}

const updateMany = async (formData: UserInput[]) => {
  const { data } = await axiosInstance.post<ResponsiveTypeData<User[]>>(UrlApi.UPDATE_MANY_USER, formData)
  return data
}

export const useMutateUpdateManyUser = (): UseMutationResult<
  ResponsiveTypeData<User[]>,
  AxiosError,
  UserInput[],
  undefined
> => {
  const queryClient = useQueryClient()
  const admin = getAdminFromLocalStorage()

  return useMutation(updateMany, {
    onSuccess: (res) => {
      if (res) {
        queryClient.removeQueries([userQueryListId])
        queryClient.refetchQueries([admin, usersQueryKey])
      }
    }
  })
}

const changeActiveUser = async ({ isActive, listData }: ChangeActiveOfUser) => {
  let url
  if (isActive) {
    url = listData ? UrlApi.ACTIVE_USER : UrlApi.ACTIVE_ALL_USER
  } else {
    url = listData ? UrlApi.INACTIVE_USER : UrlApi.INACTIVE_ALL_USER
  }

  const { data } = await axiosInstance.post<ResponsiveTypeData<User[]>>(url, listData ? { id: listData } : {})
  return data
}

export const useMutateChangeActiveUser = (): UseMutationResult<
  ResponsiveTypeData<User[]>,
  AxiosError,
  ChangeActiveOfUser,
  undefined
> => {
  const queryClient = useQueryClient()
  const admin = getAdminFromLocalStorage()

  return useMutation(changeActiveUser, {
    onSuccess: (res) => {
      if (res.http_status === 200) {
        setTimeout(() => {
          queryClient.removeQueries([userQueryListId])
          queryClient.refetchQueries([admin, usersQueryKey])
        }, 500)
      }
    }
  })
}

const uploadAvatar = async (formData: FormData) => {
  let url = ''
  if (formData.has('id')) {
    url = `${UrlApi.UPLOAD_AVATAR}/${formData.get('id')}`
  } else {
    url = `${UrlApi.UPLOAD_AVATAR}`
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

  const { data } = await axiosInstance.post<ResponsiveTypeData<UploadAvatar>>(url, formData, config)
  return data
}

export const useMutateUploadAvatar = (): UseMutationResult<
  ResponsiveTypeData<UploadAvatar>,
  AxiosError,
  FormData,
  undefined
> => {
  return useMutation(uploadAvatar)
}
