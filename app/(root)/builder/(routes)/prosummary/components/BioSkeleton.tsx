import { Skeleton } from "@/components/ui/skeleton"

const BioSkeleton = () => {
  return (
    <ul className="list-none">
    <li>

      <Skeleton className="h-20 w-full bg-white" />
    </li>
    <li>
      <Skeleton className="h-20 w-full bg-white" />
    </li>
    <li>
      <Skeleton className="h-20 w-full bg-white" />
    </li>
    </ul>
  )
}

export default BioSkeleton