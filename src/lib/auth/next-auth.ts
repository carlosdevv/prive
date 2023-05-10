import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { db } from '@/lib/database'
import { AuthenticateUser } from '../controllers/auth/auth'

function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || clientId.length === 0) {
    throw new Error('Google Client ID is not defined')
  }
  if (!clientSecret || clientSecret.length === 0) {
    throw new Error('Google Client Secret is not defined')
  }

  return { clientId, clientSecret }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        const authenticateUser = new AuthenticateUser()

        const user = await authenticateUser.execute({
          email: credentials!.email,
          password: credentials!.password
        })

        if (user) {
          return user
        } else {
          return null
        }
      }
    }),
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret
    })
  ],
  callbacks: {
    async session({ token, session, user }) {
      if (token) {
        session.user = token as any
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email!
        }
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        ...user,
        ...token
      }
    }
  }
}
