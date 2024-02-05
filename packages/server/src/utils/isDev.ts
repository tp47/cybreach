function isDev(): boolean {
  return false
  if (process.env.NODE_ENV === 'development') {
    return true
  }

  return false
}

export { isDev }
