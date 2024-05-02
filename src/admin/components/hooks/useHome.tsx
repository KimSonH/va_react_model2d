import { useQuery } from 'react-query'

import { getAdminFromLocalStorage } from './useQueryAdmin'

import type { ResponsiveTypeData } from '@admin/types/common'
import type { HomeChartQueryResponse } from '@admin/types/home'

import { UrlApi } from '@admin/config'
import axiosInstance from '@admin/config/axiosInstance'
import { TimeFilter, type HomeQuery, homesChartQueryKey } from '@admin/types/home'

export const getChartHome = async (params: HomeQuery) => {
  const dataFilter =
    params?.filter === TimeFilter.Date
      ? {
          ...params,
          timeZone: new Date(params.dateStart).getTimezoneOffset()
        }
      : {
          ...params
        }
  const { data } = await axiosInstance.get<ResponsiveTypeData<HomeChartQueryResponse>>(UrlApi.HOME_CHART, {
    params: dataFilter
  })

  return data
}

export const useQueryHomeChart = (params: HomeQuery) => {
  const admin = getAdminFromLocalStorage()
  const { data: charts, refetch: refetchChart } = useQuery(
    [admin, homesChartQueryKey, params.filter, params.dateStart, params.dateEnd],
    () => getChartHome(params),
    {
      keepPreviousData: true
    }
  )

  return { charts, refetchChart }
}
