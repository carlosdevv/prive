import { LayoutPage } from '@/components/LayoutPage'
import { Skeleton } from '@/components/ui/skeleton'

export default function AssetPageLoading() {
  return (
    <LayoutPage>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex items-center justify-between">
          <Skeleton className="w-1/2 h-12 rounded-md" />
          <Skeleton className="w-1/2 h-12 rounded-md" />
        </div>
        <Skeleton className="w-full h-[500px] rounded-lg" />
      </div>
    </LayoutPage>
  )
}
