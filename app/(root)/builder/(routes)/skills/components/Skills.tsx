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
        xl:gap-10
        md:gap-5
        gap-10
        py-5
        lg:px-10
        px-5
        "
    >
      <SuggestedSkils />
      <SelectedSkills />
    </div>
  );
};

export default Skills;
