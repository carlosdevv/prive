import { BASE_ROUTES } from '@/lib/routes'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const useUpdateGoalDialogComponent = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const isOpenDialog: boolean = searchParams?.get('update-goal') ? true : false
  const currentPath = `${BASE_ROUTES.DASHBOARD}`

  const handleOpenDialog = useCallback(
    () => router.push(`${currentPath}?update-goal=true`),
    []
  )

  const handleCloseDialog = useCallback(() => router.replace(currentPath), [])

  return { isOpenDialog, handleOpenDialog, handleCloseDialog }
}
