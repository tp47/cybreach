export type User = {
  first_name: string
  second_name: string
  display_name?: string
  login: string
  email: string
  password: string
  phone: string
  avatar?: string
}

export type Password = {
  oldPassword: string
  newPassword: string
}
