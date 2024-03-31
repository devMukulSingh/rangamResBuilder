"use client";
import Skill from "./Skill";
import CustomSkill from "./CustomSkill";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SkillsSkeleton from "./SkillsSkeleton";
import { setAiSuggestedSkills } from "@/redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";

const SkillsList = () => {
  const profession = useAppSelector(
    (state) => state.persistedReducer.personalInfo.profession
  );
  const dispatch = useAppDispatch();
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["aiSuggestedSkills", profession],
    queryFn: async () => {
      const { data } = await axios.get(`/api/ai/get-skills`, {
        params: {profession},
      });
      dispatch(setAiSuggestedSkills(data));
      return data;
    },
    refetchOnMount: false,
    staleTime:Infinity,
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
      className="      
      max-h-[22rem] 
      xl:max-h-[27rem]
      overflow-auto
      hidden-scrollbar 
      hover:custom-scrollbar 
      relative"
    >
      <div
        className="grid 
      2xl:grid-cols-4
      lg:grid-cols-3 
      sm:grid-cols-2 
      grid-cols-1  
      xl:gap-3
      gap-5

      py-2 
      pr-3
      "
      >
        {data?.map((skill: string, index: number) => (
          <>
            <Skill skill={skill} key={index} />
          </>
        ))}

        <CustomSkill />
      </div>
    </div>
  );
};

export default SkillsList;
