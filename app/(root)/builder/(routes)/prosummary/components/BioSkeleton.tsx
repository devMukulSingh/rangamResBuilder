import { Skeleton } from "@/components/ui/skeleton";

const BioSkeleton = () => {
  return (
    <ul className="list-none space-y-5">
      <li>
        <Skeleton className="h-28 w-full bg-white" />
      </li>
      <li>
        <Skeleton className="h-28 w-full bg-white" />
      </li>
      <li>
        <Skeleton className="h-28 w-full bg-white" />
      </li>
      <li>
        <Skeleton className="h-28 w-full bg-white" />
      </li>
    </ul>
  );
};

export default BioSkeleton;
