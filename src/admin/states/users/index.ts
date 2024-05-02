import { selector } from 'recoil'

import { usersLimitState } from './userLimitState'
import { usersSearchState } from './userSearchState'
import { usersPageState } from './usersPageState'

import type { UserSearchQuery } from '@admin/types/users'

export const usersSearchQueryState = selector<UserSearchQuery>({
  key: 'usersSearchQueryState',
  get: ({ get }) => {
    const page = get(usersPageState)
    const search = get(usersSearchState)
    const limit = get(usersLimitState)

    return {
      page,
      search,
      limit
    }
  }
})
