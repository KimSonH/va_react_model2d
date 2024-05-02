import type { Language } from '../common'

export type User = {
  id: string
  email: string
  first_name: string
  last_name: string
  language: Language
  domain_upload: string
  user_access_token: string
  user_refresh_token: string
  uploads: {
    id: string
    name: string
    status: boolean
    user_id: string
  }
  created_at: string
  updated_at: string
}

export type UploadAvatar = {
  id: string
  user_id?: string | null
  name: string
  status: boolean
}

export const userQueryKeys = 'user'
