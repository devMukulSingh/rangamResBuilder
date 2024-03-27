"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setTechnicalSkills } from "@/redux/slice/userSlice";

interface SkillProps {
  skill: string;
}

const Skill: React.FC<SkillProps> = ({ skill }) => {
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
  if (skill === "") return null;
  return (
    <>
      <div
        onClick={handleSelect}
        className={`
                    transition
                        px-3
                        py-2
                        min-h-16
                        w-full
                        flex 
                        items-center
                          rounded-sm
                          shadow-md
                           cursor-pointer
                            ${
                              skillsFromState.length > 0 &&
                              skillsFromState.includes(skill)
                                ? "bg-red-300 transition scale-90 text-white"
                                : " bg-white  text-black"
                            } 
                            `}
      >
        <h1 className="text-sm break-words">{skill}</h1>
      </div>
    </>
  );
};

export default Skill;
