"use client";
import Skill from "./Skill";
import { useAppSelector } from "@/redux/hooks/hooks";
import { motion } from "framer-motion";
import CustomSkill from "./CustomSkill";

const SkillsForm = () => {
  const aiSuggesedSkills = useAppSelector(
    (state) => state.persistedReducer.aiSuggesedSkills
  );

  return (
    <motion.div
      animate={{ x: 1, opacity: [0, 1] }}
      initial={{ x: -150, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-5 flex flex-col gap-5 ">
        <section>
          <h1 className=" font-semibold mb-5">Select AI Suggested Skill</h1>
          <div className="grid grid-cols-2 gap-5">
            {aiSuggesedSkills.map((skill) => (
              <Skill skill={skill} key={skill} />
            ))}
          </div>
        </section>

        <CustomSkill />
      </div>
    </motion.div>
  );
};

export default SkillsForm;
