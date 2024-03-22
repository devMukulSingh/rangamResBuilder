"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import Skill from "./Skill";

const SelectedSkills = () => {
  const selectedSkills = useAppSelector(
    (state) => state.persistedReducer.technicalSkills
  );

  return (
    <div className="flex flex-col gap-5 overflow-auto no-scrollbar">
      <h1
        className="
          text-neutral-600 
          font-semibold
          text-lg
          "
      >
        Selected Skills
      </h1>
      <div className="grid grid-cols-3 gap-5">
        {selectedSkills?.map((skill: string, index: number) => (
          <Skill key={index} skill={skill} selectedSkills={selectedSkills} />
        ))}
      </div>
    </div>
  );
};

export default SelectedSkills;
