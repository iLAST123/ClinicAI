import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-56" />
      <div className="flex justify-end gap-2">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-44" />
      </div>
      <Skeleton className="h-80" />
    </div>
  )
}
