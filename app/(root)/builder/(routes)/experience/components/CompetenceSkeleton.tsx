import { Skeleton } from "@/components/ui/skeleton";

const CompetenceSkeleton = () => {
  return (
    <div className="grid grid-cols-6 gap-5">
      <Skeleton className="h-[3.5rem] w-full bg-white" />
      <Skeleton className="h-[3.5rem] w-full bg-white" />
      <Skeleton className="h-[3.5rem] w-full bg-white" />
      <Skeleton className="h-[3.5rem] w-full bg-white" />
      <Skeleton className="h-[3.5rem] w-full bg-white" />
      <Skeleton className="h-[3.5rem] w-full bg-white" />
      <Skeleton className="h-[3.5rem] w-full bg-white" />
      <Skeleton className="h-[3.5rem] w-full bg-white" />
      <Skeleton className="h-[3.5rem] w-full bg-white" />
      <Skeleton className="h-[3.5rem] w-full bg-white" />
      <Skeleton className="h-[3.5rem] w-full bg-white" />
      <Skeleton className="h-[3.5rem] w-full bg-white" />
    </div>
  );
};

export default CompetenceSkeleton;
