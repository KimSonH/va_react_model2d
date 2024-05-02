import { useQuery } from 'react-query'

import type { Admin } from '@admin/types/admin/type'
import type { ResponsiveTypeData } from '@admin/types/common'

import { UrlApi } from '@admin/config'
import axiosInstance from '@admin/config/axiosInstance'
import { Language, adminQueryKey } from '@admin/types/admin/type'

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

export const setAdminToLocalStorage = (admin: Admin) => {
  setToLocalStorage('admin', admin.id)
}

export const getAdminFromLocalStorage = (): string | null => {
  const admin = localStorage.getItem('admin')

  if (admin) {
    try {
      return admin
    } catch (error) {
      return null
    }
  }

  return null
}

export const setAdminLanguageToLocalStorage = (language: Language) => {
  setToLocalStorage('language', language)
}

export const removeAdminLanguageFromLocalStorage = () => {
  localStorage.removeItem('language')
}

export const getAdminLanguageFromLocalStorage = (): Language => {
  const language = localStorage.getItem('language') as Language

  if (language) {
    return language
  }

  return Language.JA
}

export const setAdminDomainUploadToLocalStorage = (domain_upload: string) => {
  setToLocalStorage('domain_upload', domain_upload)
}

export const removeAdminDomainUploadFromLocalStorage = () => {
  localStorage.removeItem('domain_upload')
}

export const getAdminDomainUploadFromLocalStorage = () => {
  const domainUpload = localStorage.getItem('domain_upload')

  if (domainUpload) {
    return domainUpload
  }

  return ''
}

export const removeAdminFromLocalStorage = () => {
  localStorage.removeItem('admin')
  removeAdminDomainUploadFromLocalStorage()
}

async function getAdmin() {
  const { data } = await axiosInstance.get<ResponsiveTypeData<Admin>>(UrlApi.UPDATE_PROFILE)

  if (data.data) {
    setAdminToLocalStorage(data.data)
    setAdminDomainUploadToLocalStorage(data.data.domain_upload)
    setAdminLanguageToLocalStorage(data.data.language)
  }
  return data.data
}

export const useQueryAdmin = () => {
  const { data: admin, error } = useQuery([adminQueryKey], () => getAdmin())

  return { admin, error }
}
