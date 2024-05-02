import type { Language } from '../admin/type'

export type UserSearchQuery = {
  page?: number
  search?: string
  limit?: number
}

export type User = {
  id: string
  first_name: string
  last_name: string
  uploads: UploadAvatar
  email: string
  status: boolean
  language: Language
}

export type UsersResponse = {
  items: User[]
  total_record: number
}

export type UploadAvatarInput = {
  avatar: File
  id?: string
}

export type UploadAvatar = {
  id: string
  user_id?: string | null
  name: string
  status: boolean
}

export type ChangeActiveOfUser = { isActive: boolean; listData?: string[] }

export enum KeyUser {
  EMAIL = 'email',
  ID = 'id',
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  AVATAR = 'avatar',
  LANGUAGE = 'language'
}
export const usersQueryKey = 'users'
export const userQueryKey = 'user'
export const userQueryListId = 'userQueryListId'
