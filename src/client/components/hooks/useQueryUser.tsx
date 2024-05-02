import { useQuery } from 'react-query'

import type { ResponsiveTypeData } from '@client/types/common'

import { UrlApi } from '@client/config'
import axiosInstance from '@client/config/axiosInstance'
import { Language } from '@client/types/common'
import { userQueryKeys, type User } from '@client/types/user'

const isQuotaExceeded = (e: unknown) => {
  let quotaExceeded = false
  if (e instanceof DOMException) {
    if (e.code) {
      switch (e.code) {
        case 22:
          quotaExceeded = true
          break
        case 1014:
          // Firefox
          if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            quotaExceeded = true
          }
          break
      }
    }
  }
  return quotaExceeded
}

export const setToLocalStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    if (isQuotaExceeded(e)) {
      // Storage full, maybe notify admin or do some clean-up
      console.error('Storage is not available')
    }
  }
}

export const setUserToLocalStorage = (user: User) => {
  setToLocalStorage('user', user.id)
}

export const getUserFromLocalStorage = (): string | null => {
  const user = localStorage.getItem('user')

  if (user) {
    try {
      return user
    } catch (error) {
      return null
    }
  }

  return null
}

export const setUserLanguageToLocalStorage = (language: Language) => {
  setToLocalStorage('languageClient', language)
}

export const removeUserLanguageFromLocalStorage = () => {
  localStorage.removeItem('languageClient')
}

export const getUserLanguageFromLocalStorage = (): Language => {
  const language = localStorage.getItem('languageClient') as Language

  if (language) {
    return language
  }

  return Language.JA
}

export const setUserDomainUploadToLocalStorage = (domain_upload: string) => {
  setToLocalStorage('domain_upload', domain_upload)
}

export const removeUserDomainUploadFromLocalStorage = () => {
  localStorage.removeItem('domain_upload')
}

export const getUserDomainUploadFromLocalStorage = () => {
  const domainUpload = localStorage.getItem('domain_upload')

  if (domainUpload) {
    return domainUpload
  }

  return ''
}

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user')
  removeUserDomainUploadFromLocalStorage()
}

async function getUser() {
  const { data } = await axiosInstance.get<ResponsiveTypeData<User>>(UrlApi.UPDATE_PROFILE)

  if (data.data) {
    setUserToLocalStorage(data.data)
    setUserDomainUploadToLocalStorage(data.data.domain_upload)
    setUserLanguageToLocalStorage(data.data.language)
  }
  return data.data
}

export const useQueryUser = () => {
  const { data: user, error } = useQuery([userQueryKeys], () => getUser())

  return { user, error }
}
