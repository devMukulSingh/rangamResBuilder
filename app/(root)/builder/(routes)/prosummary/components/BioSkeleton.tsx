import { Skeleton } from "@/components/ui/skeleton"

const BioSkeleton = () => {
  return (
    <>
    <li>

      <Skeleton className="h-20 w-full bg-white" />
    </li>
    <li>
      <Skeleton className="h-20 w-full bg-white" />
    </li>
    <li>
      <Skeleton className="h-20 w-full bg-white" />
    </li>
    </>
  )
}

export default BioSkeleton