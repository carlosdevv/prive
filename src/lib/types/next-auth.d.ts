import { Role } from '@prisma/client'
import { User } from 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: Role
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string
      role: Role
      token: string
      name: string
      email: string
      refreshToken: string
    }
  }
}
