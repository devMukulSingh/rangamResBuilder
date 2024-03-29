import SkillsList from "./SkillsList";

const SuggestedSkills = async () => {
  return (
    <>
      {/* <motion.div


            animate={{ x: 1, opacity: [0, 1] }}
            initial={{ x: -150, opacity: 0 }}
            transition={{ duration: 0.2 }}
        > */}
      <div className="space-y-5 transition-all ">
        <h1
          className="
          text-center   
          sm:text-start
                        font-semibold 
                        mb-5
                        text-black
                        text-lg
                        "
        >
          Select AI Suggested Skill
        </h1>

        <SkillsList />
      </div>

      {/* </motion.div> */}
    </>
  );
};

export default SuggestedSkills;
