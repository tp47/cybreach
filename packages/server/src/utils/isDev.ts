function isDev(): boolean {
  if (process.env.NODE_ENV === 'development') {
    return true
  }

  return false
}

export { isDev }
