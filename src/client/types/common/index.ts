export enum Language {
  EN = 'EN',
  JA = 'JA'
}

export enum LanguageForSelect {
  EN = 'English',
  JA = '日本語'
}

export type ResponsiveTypeData<TData> = {
  message: string
  http_status: number
  data: TData | null
  errors?:
    | [
        {
          field: string
          value: string
          message: string
        }
      ]
    | null
}

export type ResponsiveErrors = {
  field: string
  value: string
  message: string
}

export enum IdUserMenu {
  NONE = 0,
  USER = 1,
  CHANGE_PASS = 2,
  ATTENDANCE = 3,
  LANGUAGE = 4
}
