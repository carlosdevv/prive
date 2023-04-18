import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { db } from '@/lib/database'

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
        return await fetch('api/login', {
          method: 'POST',
          body: JSON.stringify({
            email: credentials!.email,
            password: credentials!.password
          })
        })
          .then(res => res.json())
          .then(res => {
            console.log(res.user)
            return res.user
          })
          .catch(() => {
            throw new Error('Error logging in')
          })
      }
    }),
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: { secret: process.env.JWT_SECRET },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.role = token.role
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
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        phone: dbUser.phone,
        role: dbUser.role,
      }
    },
    async redirect() {
      return '/dashboard'
    }
  }
}
