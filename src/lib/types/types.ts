import { User } from '@prisma/client'

export type ICreateUserDTO = {
  email: string
  password: string
  name: string
}

export type IAuthenticateUserDTO = {
  email: string
  password: string
}

export type IRefreshTokenDTO = {
  refreshToken: string
  userId: string
}

export type UserResponse = {
  token: string
  refreshToken: string
} & UserSecureData

export type UserSecureData = Omit<User, 'password'>
