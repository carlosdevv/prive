export type ICreateUserDTO = {
  email: string
  password: string
  name: string
  phone: string
}

export type IAuthenticateUserDTO = {
  email: string
  password: string
}
