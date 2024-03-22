import { cookies } from "next/headers";
import Skill from "./Skill";
import { ChatGPT } from "@/lib/ChatGPT";
import CustomSkill from "./CustomSkill";

const SkillsList = async () => {
  const profession = cookies().get("profession")?.value || "Frontend dev";
  const skillPrompt = `My profession is ${profession}, give me a list of 13 technology names, or skills relevant to this profession in max 3 words`;
  const skills = await ChatGPT(skillPrompt);
  const parsedSkills =
    skills
      ?.replace(/\d+(\.\s*|\.)?/g, "")
      .split("\n")
      .filter((item: string) => item !== "") || [];
  console.log(parsedSkills);

  return (
    <div className="grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-3  gap-5 overflow-auto">
      {parsedSkills?.map((skill, index) => (
        <>
          <Skill skill={skill} key={index} />
        </>
      ))}

      <CustomSkill />
    </div>
  );
};

export default SkillsList;
