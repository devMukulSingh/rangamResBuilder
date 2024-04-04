import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setTechnicalSkills } from "@/redux/slice/userSlice";
import React, { useEffect, useState } from "react";

interface SkillProps {
  skill: string;
}

const Skill: React.FC<SkillProps> = ({ skill }) => {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();
  const skillsFromState: string[] =
    useAppSelector((state) => state.persistedReducer.technicalSkills) || [];

  const handleSelect = () => {
    const alreadySelected = skillsFromState.find((item) => item === skill);
    if (alreadySelected) {
      const filtered = skillsFromState.filter((item) => item !== skill);
      dispatch(setTechnicalSkills(filtered));
    } else {
      dispatch(setTechnicalSkills([...skillsFromState, skill]));
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <div
        onClick={handleSelect}
        className={`p-5
        transition
        flex
        items-center
                          rounded-md
                           cursor-pointer
                            ${
                              skillsFromState.length > 0 &&
                              skillsFromState.includes(skill)
                                ? "border-4 border-white bg-gray-400 transition scale-90 text-neutral-100"
                                : " bg-white"
                            } 
                            `}
      >
        <h1>{skill}</h1>
      </div>
    </>
  );
};

export default Skill;
