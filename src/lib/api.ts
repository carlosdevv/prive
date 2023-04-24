import { toast } from '@/hooks/useToast'
import axios from 'axios'
import { NextResponse } from 'next/server'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      NextResponse.redirect(new URL('/login', window.location.href))
    }

    return toast({
      title: 'Sessão expirada.',
      description: 'Realize seu login novamente.',
      variant: 'destructive'
    })
  }
)

export default api
