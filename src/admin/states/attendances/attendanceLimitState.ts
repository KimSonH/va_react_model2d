import { atom } from 'recoil'

export const attendanceLimitState = atom<number>({
  key: 'attendanceLimitState',
  default: 10
})
