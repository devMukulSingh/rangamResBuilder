import { Skeleton } from "@/components/ui/skeleton"

const BioSkeleton = () => {
  return (
    <>
      <li className="flex flex-col">
        <Skeleton className="h-8 w-full bg-neutral-200" />
      </li>
      <li className="flex flex-col">
        <Skeleton className="h-8 w-full bg-neutral-200" />
      </li>
      <li className="flex flex-col">
        <Skeleton className="h-8 w-full bg-neutral-200" />
      </li>
      <li className="flex flex-col">
        <Skeleton className="h-8 w-full bg-neutral-200" />
      </li>
    </>
  )
}

export default BioSkeleton