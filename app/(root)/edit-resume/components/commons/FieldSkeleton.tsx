import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const FieldSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 w-1/2">
      <h1 className="text-sm font-semibold">Country Code</h1>
      <Skeleton className="h-10  bg-neutral-100" />
    </div>
  );
};

export default FieldSkeleton;
