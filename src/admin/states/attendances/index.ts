import { selector } from 'recoil'

import { attendanceDateTimeState } from './attendanceDateTimeState'
import { attendanceLimitState } from './attendanceLimitState'
import { attendancePageState } from './attendancePageState'

import type { AttendanceSearchQuery } from '@admin/types/attendances'

export const attendancesSearchQueryState = selector<AttendanceSearchQuery>({
  key: 'attendancesSearchQueryState',
  get: ({ get }) => {
    const page = get(attendancePageState)
    const dataTime = get(attendanceDateTimeState)
    const limit = get(attendanceLimitState)

    return {
      page,
      dataTime,
      limit
    }
  }
})
