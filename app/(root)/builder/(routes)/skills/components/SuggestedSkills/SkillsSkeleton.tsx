import { Skeleton } from "@/components/ui/skeleton";
import CustomSkill from "./CustomSkill";

const SkillsSkeleton = () => {
  return (
    <div
      className="grid 
      2xl:grid-cols-4
      lg:grid-cols-3 
      sm:grid-cols-2 
      grid-cols-1  
      2xl:gap-3
      gap-5 
      xl:max-h-[27rem]
      max-h-[22rem]
      overflow-auto
      py-2 
      pr-3
      hidden-scrollbar 
      hover:custom-scrollbar 
      relative
      "
    >
      <Skeleton className="flex w-full h-[4rem]  bg-white" />
      <Skeleton className="flex w-full h-[4rem]  bg-white" />
      <Skeleton className="flex w-full h-[4rem]  bg-white" />
      <Skeleton className="flex w-full h-[4rem]  bg-white" />
      <Skeleton className="flex w-full h-[4rem]  bg-white" />
      <Skeleton className="flex w-full h-[4rem]  bg-white" />
      <Skeleton className="flex w-full h-[4rem]  bg-white" />
      <Skeleton className="flex w-full h-[4rem]  bg-white" />
      <Skeleton className="flex w-full h-[4rem]  bg-white" />
      <Skeleton className="flex w-full h-[4rem]  bg-white" />
      <Skeleton className="flex w-full h-[4rem]  bg-white" />
      <Skeleton className="flex w-full h-[4rem]  bg-white" />
      <Skeleton className="flex w-full h-[4rem]  bg-white" />

      <CustomSkill />
    </div>
  );
};

export default SkillsSkeleton;
