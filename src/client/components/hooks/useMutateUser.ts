import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import {
  removeUserFromLocalStorage,
  setUserDomainUploadToLocalStorage,
  setUserLanguageToLocalStorage,
  setUserToLocalStorage
} from './useQueryUser'

import type { ChangePasswordInput } from '@client/schema/ChangePassword'
import type { LoginInput } from '@client/schema/Login'
import type { UserInformationInput } from '@client/schema/UserInformation'
import type { ResponsiveTypeData } from '@client/types/common'
import type { User } from '@client/types/user'
import type { AxiosError } from 'axios'
import type { UseMutationResult } from 'react-query'

import { UrlApi } from '@client/config'
import axiosInstance from '@client/config/axiosInstance'
import { userQueryKeys } from '@client/types/user'

export const axiosUnAuthInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})

const login = async (formData: LoginInput): Promise<ResponsiveTypeData<User>> => {
  const { data } = await axiosUnAuthInstance.post<ResponsiveTypeData<User>>(UrlApi.POST_LOGIN, formData)
  return data
}

export const useMutateLogin = (): UseMutationResult<ResponsiveTypeData<User>, AxiosError, LoginInput, undefined> => {
  const queryClient = useQueryClient()

  return useMutation(login, {
    onSuccess: (res) => {
      if (res.data) {
        queryClient.removeQueries([])
        setUserToLocalStorage(res.data)
        setUserDomainUploadToLocalStorage(res.data.domain_upload)
        setUserLanguageToLocalStorage(res.data.language)
        queryClient.setQueryData(userQueryKeys, res.data)
      }
    }
  })
}

const logout = async () => {
  const { data } = await axiosInstance.post<ResponsiveTypeData<User>>(UrlApi.POST_LOGOUT, {})

  return data
}

export const useMutateLogout = (): UseMutationResult<ResponsiveTypeData<User>, AxiosError> => {
  const queryClient = useQueryClient()

  return useMutation(logout, {
    onMutate: () => {
      removeUserFromLocalStorage()
      queryClient.removeQueries([userQueryKeys])
    }
  })
}

// update user
const updateProfile = async (formData: UserInformationInput): Promise<ResponsiveTypeData<User>> => {
  const { data } = await axiosInstance.post<ResponsiveTypeData<User>>(UrlApi.UPDATE_PROFILE, formData)
  return data
}

export const useMutateUpdateProfile = (): UseMutationResult<
  ResponsiveTypeData<User>,
  AxiosError,
  UserInformationInput,
  undefined
> => {
  const queryClient = useQueryClient()

  return useMutation(updateProfile, {
    onSuccess: (res) => {
      if (res.data) {
        setUserToLocalStorage(res.data)
        setUserDomainUploadToLocalStorage(res.data.domain_upload)
        setUserLanguageToLocalStorage(res.data.language)
        queryClient.setQueryData(userQueryKeys, res.data)
      }
    }
  })
}

// change password
const changePassword = async (formData: ChangePasswordInput) => {
  const { data } = await axiosInstance.post<ResponsiveTypeData<User>>(UrlApi.CHANGE_PASSWORD, formData)

  return data
}

export const useMutateChangePassword = (): UseMutationResult<
  ResponsiveTypeData<User>,
  AxiosError,
  ChangePasswordInput,
  undefined
> => {
  return useMutation(changePassword, {
    onSuccess: () => {}
  })
}
