import { atom } from 'recoil'

export const usersPageState = atom<number>({
  key: 'usersPageState',
  default: 1
})
