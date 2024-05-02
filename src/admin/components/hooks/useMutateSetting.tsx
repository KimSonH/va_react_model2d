import { type UseMutationResult, useMutation } from 'react-query'

import type { AttendanceInput } from '@admin/schema/setting'
import type { ResponsiveTypeData } from '@admin/types/common'
import type { SettingAttendanceTime } from '@admin/types/settings'
import type { AxiosError } from 'axios'

import { UrlApi } from '@admin/config'
import axiosInstance from '@admin/config/axiosInstance'

const changeTimeAttendance = async (formData: AttendanceInput): Promise<ResponsiveTypeData<SettingAttendanceTime>> => {
  const { data } = await axiosInstance.post<ResponsiveTypeData<SettingAttendanceTime>>(UrlApi.ATTENDANCE_TIME, formData)
  return data
}

export const useMutateChangeTimeAttendance = (): UseMutationResult<
  ResponsiveTypeData<SettingAttendanceTime>,
  AxiosError,
  AttendanceInput,
  undefined
> => {
  return useMutation(changeTimeAttendance)
}
