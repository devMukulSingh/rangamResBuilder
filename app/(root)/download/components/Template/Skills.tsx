"use client";

import { useAppSelector } from "@/redux/hooks/hooks";
import { CheckCircle } from "lucide-react";

const Skills = () => {
  const skills = useAppSelector(
    (state) => state.persistedReducer.technicalSkills,
  );

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-5 ">
        <hr className="h-2 border-none bg-blue-400 w-14" />
        <h1 className=" font-bold">SKILLS</h1>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {skills?.map((skill, index) => {
          return (
            <div
              className="flex items-center border px-2 py-2 text-xs rounded-md"
              key={index}
            >
              {skill}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
