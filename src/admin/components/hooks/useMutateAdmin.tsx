import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import {
  removeAdminFromLocalStorage,
  setAdminDomainUploadToLocalStorage,
  setAdminLanguageToLocalStorage,
  setAdminToLocalStorage
} from './useQueryAdmin'

import type { LoginInput } from '@/admin/schema/login/type'
import type { ProfileInput } from '@admin/schema/profile'
import type { Admin, Token } from '@admin/types/admin/type'
import type { ResponsiveTypeData } from '@admin/types/common'
import type { AxiosError } from 'axios'
import type { UseMutationResult } from 'react-query'

import axiosInstance from '@/admin/config/axiosInstance'
import { UrlApi } from '@admin/config'
import { adminQueryKey } from '@admin/types/admin/type'

export const axiosUnAuthInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})

const login = async (formData: LoginInput): Promise<ResponsiveTypeData<Admin & Token>> => {
  const { data } = await axiosUnAuthInstance.post<ResponsiveTypeData<Admin & Token>>(UrlApi.POST_LOGIN, formData)
  return data
}

export const useMutateLogin = (): UseMutationResult<
  ResponsiveTypeData<Admin & Token>,
  AxiosError,
  LoginInput,
  undefined
> => {
  const queryClient = useQueryClient()

  return useMutation(login, {
    onSuccess: (res) => {
      if (res.data) {
        queryClient.removeQueries([])
        setAdminToLocalStorage(res.data)
        setAdminDomainUploadToLocalStorage(res.data.domain_upload)
        setAdminLanguageToLocalStorage(res.data.language)
        queryClient.setQueryData(adminQueryKey, res.data)
      }
    }
  })
}

const logout = async () => {
  const { data } = await axiosInstance.post<ResponsiveTypeData<Admin>>(UrlApi.POST_LOGOUT, {})

  return data
}

export const useMutateLogout = (): UseMutationResult<ResponsiveTypeData<Admin>, AxiosError> => {
  const queryClient = useQueryClient()

  return useMutation(logout, {
    onMutate: () => {
      removeAdminFromLocalStorage()
      queryClient.removeQueries([adminQueryKey])
    }
  })
}

const updateProfile = async (formData: ProfileInput): Promise<ResponsiveTypeData<Admin>> => {
  const { data } = await axiosInstance.post<ResponsiveTypeData<Admin>>(UrlApi.UPDATE_PROFILE, formData)
  return data
}

export const useMutateUpdateProfile = (): UseMutationResult<
  ResponsiveTypeData<Admin>,
  AxiosError,
  ProfileInput,
  undefined
> => {
  const queryClient = useQueryClient()

  return useMutation(updateProfile, {
    onSuccess: (res) => {
      if (res.data) {
        setAdminToLocalStorage(res.data)
        setAdminDomainUploadToLocalStorage(res.data.domain_upload)
        setAdminLanguageToLocalStorage(res.data.language)
        queryClient.setQueryData(adminQueryKey, res.data)
      }
    }
  })
}

const regControl = async ({ camera }: { camera: boolean }) => {
  const { data } = await axiosInstance.post<ResponsiveTypeData<Admin>>(UrlApi.REG_CONTROL, { camera })
  return data
}
export const useMutateRegControl = (): UseMutationResult<
  ResponsiveTypeData<Admin>,
  AxiosError,
  { camera: boolean },
  undefined
> => {
  const queryClient = useQueryClient()

  return useMutation(regControl, {
    onSuccess(res) {
      if (res.data) {
        setAdminToLocalStorage(res.data)
        setAdminDomainUploadToLocalStorage(res.data.domain_upload)
        setAdminLanguageToLocalStorage(res.data.language)
        queryClient.setQueryData(adminQueryKey, res.data)
      }
    }
  })
}
