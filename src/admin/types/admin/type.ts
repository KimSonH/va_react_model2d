export enum Language {
  EN = 'EN',
  JA = 'JA'
}

export enum LanguageForSelect {
  EN = 'English',
  JA = '日本語'
}

export type Admin = {
  id: string
  email: string
  first_name: string
  last_name: string
  domain_upload: string
  language: Language
  camera: boolean
}

export type Token = {
  admin_access_token: string
  admin_refresh_token: string
}

export const adminQueryKey = 'admin'
