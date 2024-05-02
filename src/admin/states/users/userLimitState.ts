import { atom } from 'recoil'

export const usersLimitState = atom<number>({
  key: 'usersLimitState',
  default: 10
})
