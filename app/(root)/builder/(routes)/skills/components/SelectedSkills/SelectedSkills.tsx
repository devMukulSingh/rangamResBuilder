"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import Skill from "./Skill";

const SelectedSkills = () => {
  const selectedSkills = useAppSelector(
    (state) => state.persistedReducer.technicalSkills,
  );

  return (
    <div className="flex flex-col gap-5 ">
      <h1
        className="
          text-black
          font-semibold
          text-lg
          "
      >
        Selected Skills
      </h1>
      <div
        className="grid 
        grid-cols-1 
        md:grid-cols-2 
        lg:grid-cols-3 
        gap-5 
        overflow-auto 
        pr-3 
        hidden-scrollbar 
        hover:custom-scrollbar
        max-h-[27rem] 
         "
      >
        {selectedSkills?.map((skill: string, index: number) => (
          <Skill key={index} skill={skill} selectedSkills={selectedSkills} />
        ))}
      </div>
    </div>
  );
};

export default SelectedSkills;
