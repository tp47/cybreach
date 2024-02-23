export const getCurrentTimestamp = () => {
  const now = new Date()
  const timestamp = now.getTime()
  return timestamp
}
