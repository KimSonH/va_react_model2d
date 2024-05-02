import { Language } from '@client/types/common'

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

export const stringDatetimeFormat = (date: string) => {
  const dateTime = new Date(date)
  const year = dateTime.getFullYear()
  const month = dateTime.getMonth() + 1
  const day = dateTime.getDate()
  const hour = dateTime.getHours()
  const minute = dateTime.getMinutes()
  const second = dateTime.getSeconds()

  return `${year}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day} ${hour < 10 ? '0' + hour : hour}:${
    minute < 10 ? '0' + minute : minute
  }:${second < 10 ? '0' + second : second}`
}

export const getLanguageFromLocalStorage = (): Language => {
  const language = localStorage.getItem('language') as Language

  if (language) {
    return language
  }

  return Language.JA
}

//
export const getTimeJoined = (created_at: string): string => {
  const joinDate: Date = new Date(created_at)
  const currentDate: Date = new Date()
  const timeDiff: number = currentDate.getTime() - joinDate.getTime()
  const seconds: number = Math.floor(timeDiff / 1000)
  const minutes: number = Math.floor(seconds / 60)
  const hours: number = Math.floor(minutes / 60)
  const days: number = Math.floor(hours / 24)
  const months: number = Math.floor(days / 30)
  const years: number = Math.floor(months / 12)

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ago`
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else {
    return `just now`
  }
}
