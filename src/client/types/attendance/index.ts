import type { Language } from '../common'
import type { UploadAvatar } from '../user'

export type UserAttendances = {
  uploads: UploadAvatar | null
  created_at: string
  email: string
  first_name: string
  id: string
  language: Language
  last_name: string
  status: boolean
  attendances: Attendance
  deleted_at?: string
}

export type Attendance = {
  created_at: string
  id: string
  status: boolean
  user_id: string
}

export type AttendancesResponse = {
  items: UserAttendances[]
  total_record: number
  total_user_active: number
}
