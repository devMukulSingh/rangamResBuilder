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
  console.log(data);
  if (isError) {
    console.log(`Error in GETSkills ${error}`);
  }

  return (
    <div
      className="grid 
      lg:grid-cols-3 
      md:grid-cols-2 
      sm:grid-cols-2 
      grid-cols-1  
      gap-5 
      h-[27rem]
      overflow-auto 
      py-2 
      pr-3
      hidden-scrollbar 
      hover:custom-scrollbar 
      "
    >
      {isLoading ? (
        <SkillsSkeleton />
      ) : (
        data?.map((skill: string, index: number) => (
          <>
            <Skill skill={skill} key={index} />
          </>
        ))
      )}

      <CustomSkill />
    </div>
  );
};

export default SkillsList;
