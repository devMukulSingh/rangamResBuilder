"use client";

import { useAppSelector } from "@/redux/hooks/hooks";
import { CheckCircle } from "lucide-react";

const Skills = () => {
  const skills = useAppSelector(
    (state) => state.persistedReducer.technicalSkills,
  );

  return (
    <section className="space-y-2">
      <div className="flex items-center gap-5 ">
        <hr className="h-2 border-none bg-blue-400 w-14" />
        <h1 className=" font-bold">SKILLS</h1>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {skills?.map((skill, index) => {
          return (
            <div className="flex gap-4 items-center" key={index}>
              {/* <CheckCircle className="shrink-0" /> */}
              {skill}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
