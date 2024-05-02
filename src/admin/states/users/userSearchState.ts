import { atom } from 'recoil'

export const usersSearchState = atom<string>({
  key: 'usersSearchState',
  default: ''
})
