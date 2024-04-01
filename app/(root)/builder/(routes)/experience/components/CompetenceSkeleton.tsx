import { Skeleton } from "@/components/ui/skeleton";

const CompetenceSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-5">
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
