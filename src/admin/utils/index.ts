export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

export const stringTimeFormat = (date: string | Date) => {
  const dateTime = new Date(date)
  const hour = dateTime.getHours()
  const minute = dateTime.getMinutes()
  const second = dateTime.getSeconds()

  return `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${
    second < 10 ? '0' + second : second
  }`
}

export const stringDatetimeFormat = (date: string | Date) => {
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

export const stringDate = (date: string | Date) => {
  const dateTime = new Date(date)
  const year = dateTime.getFullYear()
  const month = dateTime.getMonth() + 1
  const day = dateTime.getDate()

  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
}

export const stringDateTimeNoSecsFormat = (date: string) => {
  const dateTime = new Date(date)
  const year = dateTime.getFullYear()
  const month = dateTime.getMonth() + 1
  const day = dateTime.getDate()
  const hour = dateTime.getHours()
  const minute = dateTime.getMinutes()

  return `${year}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day} ${hour < 10 ? '0' + hour : hour}:${
    minute < 10 ? '0' + minute : minute
  }`
}

export const getDate = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes())
}

export const stringDatetimeFormatForChart = (date: string) => {
  return new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase()
}

export const isBiggerDate = (date1: number, date2: number) => {
  return date1 >= date2
}

export const getDuration = (startDateString: string, finishDateString: string) => {
  const diff = Math.round((+new Date(finishDateString) - +new Date(startDateString)) / 1000)
  const hours = Math.floor(diff / 3600) // get hours
  const minutes = Math.floor((diff - hours * 3600) / 60) // get minutes
  const seconds = Math.floor(diff - hours * 3600 - minutes * 60) //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  let hourString = String(hours)
  if (hours < 10) {
    hourString = String('0' + hours)
  }
  let minutesString = String(minutes)
  if (minutes < 10) {
    minutesString = String('0' + minutes)
  }
  let secondsString = String(seconds)
  if (seconds < 10) {
    secondsString = String('0' + seconds)
  }
  const result = hourString + ':' + minutesString + ':' + secondsString // Return is HH : MM : SS
  return result
}

export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const isSameDateTime = (d1: Date, d2: Date) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDay() === d2.getDay() &&
    d1.getHours() === d2.getHours() &&
    d1.getMinutes() === d2.getMinutes()
  )
}

export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const oneOrTwo = () => {
  return Math.random() < 0.5 ? 1 : 2
}

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => resolve(fileReader.result as string)
    fileReader.onerror = (error) => reject(error)
  })
