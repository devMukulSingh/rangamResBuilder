import dynamic from "next/dynamic";
import SkillsSkeleton from "./SkillsSkeleton";

const SkillsList = dynamic(() => import("./SkillsList"), {
  loading: () => <SkillsSkeleton />,
});

const SuggestedSkills = async () => {
  return (
    <>
      {/* <motion.div


            animate={{ x: 1, opacity: [0, 1] }}
            initial={{ x: -150, opacity: 0 }}
            transition={{ duration: 0.2 }}
        > */}
      <div className="space-y-5 transition-all ">
        <section>
          <h1
            className=" 
                        font-semibold 
                        mb-5
                        text-black
                        text-lg
                        "
          >
            Select AI Suggested Skill
          </h1>

          <SkillsList />
        </section>
      </div>

      {/* </motion.div> */}
    </>
  );
};

export default SuggestedSkills;
