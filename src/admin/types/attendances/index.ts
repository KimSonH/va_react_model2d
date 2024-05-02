import type { Language } from '../admin/type'
import type { UploadAvatar } from '../users'

export type AttendanceSearchQuery = {
  page: number
  limit: number
  dataTime: Date
}

export type Attendance = {
  id: string
  last_name: string
  first_name: string
  language: Language
  email: string
  uploads: UploadAvatar
  attendances: {
    created_at: string
    id: string
    status: boolean
    deleted_at: string
  }
  deleted_at?: string
}

export type AttendancesResponse = {
  items: Attendance[]
  total_record: number
  total_user_active: number
}
