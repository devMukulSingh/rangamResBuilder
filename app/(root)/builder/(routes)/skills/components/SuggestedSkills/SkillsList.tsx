"use client";

import Skill from "./Skill";
import CustomSkill from "./CustomSkill";
import axios from "axios";
import SkillsSkeleton from "./SkillsSkeleton";
import { setAiSuggestedSkills } from "@/redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import useSWR from "swr";

export type Ifetcher = [url: string, profession: string];

const SkillsList = () => {
  const profession = useAppSelector(
    (state) => state.persistedReducer.personalInfo.profession,
  );
  const dispatch = useAppDispatch();
  const fetcher = ([url, profession]: Ifetcher) =>
    axios.get(url, { params: { profession } }).then((res) => res.data);

  const { data, error, isLoading } = useSWR(
    ["/api/ai/get-skills", profession],
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect:false,
    },
  );
  dispatch(setAiSuggestedSkills(data));

  if (error) {
    console.log(`Error in GETSkills ${error}`);
  }
  if (isLoading) {
    return <SkillsSkeleton />;
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
      {!data || data.length < 2 ? (
        <SkillsSkeleton />
      ) : (
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
      )}
    </div>
  );
};

export default SkillsList;
