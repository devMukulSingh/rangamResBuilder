import React, { FC, useEffect } from "react";
import SuggestedSkils from "./SuggestedSkills/SuggestedSkills";
import SelectedSkills from "./SelectedSkills/SelectedSkills";

const Skills = async ({}) => {
  return (
    <div
      className="
        w-full 
        bg-red-100
        rounded-md
        grid
        md:grid-cols-2
        grid-cols-1
        gap-10
        py-5
        px-10
        h-[30rem]
        "
    >
      <SuggestedSkils />
      <SelectedSkills />
    </div>
  );
};

export default Skills;
