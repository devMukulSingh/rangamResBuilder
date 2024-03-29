"use client";
import Skill from "./Skill";
import CustomSkill from "./CustomSkill";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SkillsSkeleton from "./SkillsSkeleton";
import { setAiSuggestedSkills } from "@/redux/slice/userSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";

const SkillsList = () => {
  const dispatch = useAppDispatch();
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["aiSuggestedSkills"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/ai/get-skills`);
      dispatch(setAiSuggestedSkills(data));
      return data;
    },
    staleTime: 5 * 1000,
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return <SkillsSkeleton />;
  }
  if (isError) {
    console.log(`Error in GETSkills ${error}`);
  }

  return (
    <div
      className="grid 
      2xl:grid-cols-4
      lg:grid-cols-3 
      sm:grid-cols-2 
      grid-cols-1  
      xl:gap-3
      gap-5 
      max-h-[27rem]
      overflow-auto
      py-2 
      pr-3
      hidden-scrollbar 
      hover:custom-scrollbar 
      relative
      "
    >
      {data?.map((skill: string, index: number) => (
        <>
          <Skill skill={skill} key={index} />
        </>
      ))}

      <CustomSkill />
    </div>
  );
};

export default SkillsList;
