import { atom } from 'recoil'

export const attendancePageState = atom<number>({
  key: 'attendancePageState',
  default: 1
})
