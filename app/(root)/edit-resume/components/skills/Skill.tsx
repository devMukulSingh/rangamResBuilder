import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setTechnicalSkills } from "@/redux/slice/userSlice";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

interface SkillProps {
  skill: string;
}

const Skill: React.FC<SkillProps> = ({ skill }) => {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();
  const skillsFromState: string[] =
    useAppSelector((state) => state.persistedReducer.technicalSkills) || [];
  const handleDelete = () => {
          const filtered = skillsFromState.filter((item) => item !== skill);
          dispatch(setTechnicalSkills(filtered));
  }
  // const handleSelect = () => {
  //   const alreadySelected = skillsFromState.find((item) => item === skill);
  //   if (alreadySelected) {
  //     const filtered = skillsFromState.filter((item) => item !== skill);
  //     dispatch(setTechnicalSkills(filtered));
  //   } else {
  //     dispatch(setTechnicalSkills([...skillsFromState, skill]));
  //   }
  // };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <div
        className={`
        py-5
        pl-5
        pr-2
        flex
        justify-between
      bg-white
        rounded-md
        `}
      >
        <h1>{skill}</h1>
        <Trash
          onClick={handleDelete} 
          className="cursor-pointer" size={20} />
      </div>
    </>
  );
};

export default Skill;
