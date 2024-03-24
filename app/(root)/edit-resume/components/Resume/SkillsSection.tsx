import { useAppSelector } from "@/redux/hooks/hooks";
import { CheckCircle } from "lucide-react";
import React from "react";

interface SkillsSectionProps {}

const SkillsSection: React.FC<SkillsSectionProps> = ({}) => {
  const skills = useAppSelector(
    (state) => state.persistedReducer.technicalSkills
  );

  return (
    <div className="space-y-5 bg-white p-5">
      <h1 className=" text-xl font-semibold">Technical Skills</h1>
      <div className="grid grid-cols-4 gap-5">
        {skills?.map((skill, index) => {
          return (
            <div className="flex gap-4 items-center" key={index}>
              <CheckCircle className="shrink-0" />
              {skill}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsSection;
