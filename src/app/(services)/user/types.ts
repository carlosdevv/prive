import { Role, User } from '@prisma/client'
import { User as UserNextAuth } from 'next-auth'

export type ICreateUserDTO = {
  email: string
  password: string
  name: string
}

export type UserSession = UserNextAuth & {
  id: string
  role: Role
  token: string
  name: string
  email: string
  refreshToken: string
}

export type UserSecureData = Omit<User, 'password'>

export type CreateUserBody = ICreateUserDTO
