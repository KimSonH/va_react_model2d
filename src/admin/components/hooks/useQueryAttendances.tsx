import { useQuery } from 'react-query'

import { getAdminFromLocalStorage } from './useQueryAdmin'

import type { AttendanceSearchQuery } from '@admin/types/attendances'
import type { AttendancesResponse } from '@admin/types/attendances'
import type { ResponsiveTypeData } from '@admin/types/common'

import { UrlApi } from '@admin/config'
import axiosInstance from '@admin/config/axiosInstance'

const getAttendanceList = async (params: AttendanceSearchQuery) => {
  const { data } = await axiosInstance.get<ResponsiveTypeData<AttendancesResponse>>(UrlApi.ATTENDANCE, {
    params: {
      page: params.page,
      limit: params.limit,
      date_time: params.dataTime
    }
  })

  return data
}

export const useQueryAttendances = (params: AttendanceSearchQuery) => {
  const admin = getAdminFromLocalStorage()

  const { data, refetch } = useQuery(
    [admin, params.page, params.limit, params.dataTime],
    () => getAttendanceList(params),
    {
      cacheTime: 0,
      staleTime: 0,
      keepPreviousData: true
    }
  )

  return { attendances: data?.data, refetch }
}
