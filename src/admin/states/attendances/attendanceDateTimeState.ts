import { atom } from 'recoil'

export const attendanceDateTimeState = atom<Date>({
  key: 'attendanceDateTimeState',
  default: new Date()
})
