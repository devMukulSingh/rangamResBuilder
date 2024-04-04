"use client";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/redux/hooks/hooks";
import SkillsSection from "./SkillsSection";
import EducationSection from "./EducationSection";
import ProjectSection from "./ProjectSection";
import AchievementSection from "./AchievementSection";
import ExperienceSection from "./ExperienceSection";
import PersonalSection from "./PersonalSection";

const LanguageSection = dynamic(() => import("./LanguageSection"), {
  ssr: false,
});
import { motion } from "framer-motion";

const Resume = () => {
  const sidebar = useAppSelector((state) => state.commonSlice.sidebar);
  const formComp = useAppSelector((state) => state.commonSlice.formComp);

  return (
    <motion.div
      initial={{ opacity: 0, x: 150 }}
      animate={{ opacity: [0, 1], x: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`max-h-[calc(100vh-6rem)] overflow-auto no-scrollbar ${sidebar ? "w-[calc(100vw-47rem)]" : "w-[calc(100vw-37rem)]"} pb-20  max-w-[55rem] shrink-0`}
      >
        <div className="text-neutral-700 pb-10 min-w-[40rem] flex flex-col gap-5 p-5">
          <PersonalSection />

          <ExperienceSection />

          <SkillsSection />

          <EducationSection />

          <ProjectSection />

          <AchievementSection />

          <LanguageSection />
        </div>
      </div>
    </motion.div>
  );
};

export default Resume;
