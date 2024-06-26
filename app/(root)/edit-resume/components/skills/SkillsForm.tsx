"use client";
import Skill from "./Skill";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { motion } from "framer-motion";
import { setFormComp } from "@/redux/slice/commonSlice";
import { Button } from "@/components/ui/button";
import CustomSkill from "@/app/(root)/builder/(routes)/skills/components/SuggestedSkills/CustomSkill";
import useSWR from "swr";

const SkillsForm = () => {
  const dispatch = useAppDispatch();
  const profession = useAppSelector(
    (state) => state.persistedReducer.personalInfo.profession,
  );
  const { data: aiSuggestedSkills } = useSWR(
    ["/api/ai/get-skills", profession],
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      revalidateOnMount: false,
    },
  );

  return (
    <motion.div
      animate={{ x: 1, opacity: [0, 1] }}
      initial={{ x: -150, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="px-5 pt-10 pb-20 flex flex-col gap-5 ">
        <section>
          <h1 className=" font-semibold mb-5">Select AI Suggested Skill</h1>
          <div className="grid grid-cols-2 gap-5">
            {aiSuggestedSkills?.map((skill: string) => (
              <Skill skill={skill} key={skill} />
            ))}
          </div>
        </section>

        <CustomSkill />
        <Button
          onClick={() => dispatch(setFormComp("Education"))}
          className="w-1/3 self-center mt-5"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
};

export default SkillsForm;
