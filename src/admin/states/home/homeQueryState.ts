import { selector } from 'recoil'

import { homeChartFilterState, homeFilterState } from './homeFilterState'

import type { HomeQuery } from '@admin/types/home'

export const homeQueryState = selector<HomeQuery>({
  key: 'homeSearchQuery',
  get: ({ get }) => {
    const query = get(homeFilterState)
    return {
      ...query
    }
  }
})

export const homeChartQueryState = selector<HomeQuery>({
  key: 'homeChartQueryState',
  get: ({ get }) => {
    const query = get(homeChartFilterState)
    return {
      ...query
    }
  }
})
