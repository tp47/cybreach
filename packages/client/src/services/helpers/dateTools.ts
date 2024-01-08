function addLeadingZero(num: number): string {
  if (num < 10) {
    return `0${num}`
  }
  return num.toString()
}

export const getFormatDate = (timestamp: number) => {
  const date = new Date(timestamp)

  const day = date.getDate()
  const month = date.getMonth() + 1

  return `${addLeadingZero(day)}.${addLeadingZero(month)}.${date.getFullYear()}`
}
