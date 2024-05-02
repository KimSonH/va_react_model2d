import type { Dispatch, SetStateAction } from 'react'

declare type Key = React.Key

declare type DataIndex = string | number | readonly (string | number)[]

interface ColumnType<RecordType> {
  key?: Key
  title?: React.ReactNode
  className?: string
  dataIndex: DataIndex
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, record: RecordType, index: number) => React.ReactNode
}

export type ColumnsType<RecordType = unknown> = ColumnType<RecordType>[]

export interface TableProps<RecordType> {
  loading: boolean
  className?: string
  dataSource?: readonly RecordType[]
  columns?: ColumnsType<RecordType>
  rowSelection?: {
    keyCheck?: string
    selections: string[]
    onChange: (selectedRows: RecordType[] | []) => void
  }
  pagination: {
    page: number
    limit: number
    setPage: Dispatch<SetStateAction<number>>
    setLimit: Dispatch<SetStateAction<number>>
    totalCount: number
  }
}
