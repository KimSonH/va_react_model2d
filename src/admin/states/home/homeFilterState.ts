import moment from 'moment'
import { atom } from 'recoil'

import { TimeFilter, type HomeQuery } from '@admin/types/home'

export const homeFilterState = atom<HomeQuery>({
  key: 'homeFilterState',
  default: {
    filter: TimeFilter.Date,
    dateStart: moment().toISOString(),
    dateEnd: moment().toISOString()
  }
})

export const homeChartFilterState = atom<HomeQuery>({
  key: 'homeChartFilterState',
  default: {
    filter: TimeFilter.Date,
    dateStart: moment().toISOString(),
    dateEnd: moment().toISOString()
  }
})
