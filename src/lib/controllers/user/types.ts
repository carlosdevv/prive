import { User } from '@prisma/client'

export type ICreateUserDTO = {
  email: string
  password: string
  name: string
}
export type UserSecureData = Omit<User, 'password'>
