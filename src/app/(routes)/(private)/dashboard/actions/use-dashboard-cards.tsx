import { useFetchUSDCotation } from '@/app/(services)/asset/useAsset'
import { useAppContext } from '@/contexts/useAppContext'

export const useDashboardCardsComponent = () => {
  const { patrimonyValue } = useAppContext()
  const { data: dollarCotation, isLoading } = useFetchUSDCotation({
    staleTime: 60 * 60 * 1000, // 60 minutes
    cacheTime: 60 * 60 * 1000 // 60 minutes
  })

  return {
    patrimonyValue,
    isLoading,
    dollarCotation
  }
}
