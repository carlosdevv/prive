'use client'

import { UserSession } from '@/app/(services)/user/types'
import { useRef } from 'react'
import { useAppStore } from '.'

type InitializerAppStoreProps = {
  userProps: UserSession
}

export const InitializerAppStore = ({
  userProps
}: InitializerAppStoreProps) => {
  const initializer = useRef(false)

  if (!initializer.current) {
    useAppStore.getState().actions.setUserProps(userProps)
    initializer.current = true
  }

  return null
}
