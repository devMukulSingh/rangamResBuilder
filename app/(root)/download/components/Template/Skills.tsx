"use client";

import { useAppSelector } from "@/redux/hooks/hooks";

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
      <ul className="list-disc pl-8">
        <li className="whitespace-normal">
          <span className="font-semibold">Tech:</span>{" "}
          {skills.map((item) => item).join(", ")},
        </li>
      </ul>
    </section>
  );
};

export default Skills;
