import { useQuery } from 'react-query'

import type { ResponsiveTypeData } from '@admin/types/common'
import type { SettingAttendanceTime } from '@admin/types/settings'

import { UrlApi } from '@admin/config'
import axiosInstance from '@admin/config/axiosInstance'

const getAttendanceTime = async () => {
  const { data } = await axiosInstance.get<ResponsiveTypeData<SettingAttendanceTime>>(UrlApi.ATTENDANCE_TIME)

  return data
}

export const useQuerySettingAttendanceTime = () => {
  const { data } = useQuery(['settingAttendanceTime'], () => getAttendanceTime(), {
    cacheTime: 0,
    staleTime: 0,
    keepPreviousData: true
  })

  return { data: data?.data }
}
