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
