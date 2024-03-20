'use client'

import dynamic from "next/dynamic"
import SkillsSkeleton from "./SkillsSkeleton"

const SkillsList = dynamic( () => import("./SkillsList") ,{
    ssr:false,
    loading : () => <SkillsSkeleton/>
})

const SuggestedSkills = () => {

    return (
        // <motion.div
        //     animate={{ x: 1, opacity: [0, 1] }}
        //     initial={{ x: -150, opacity: 0 }}
        //     transition={{ duration: 0.2 }}
        // >
        <div className="space-y-5 h-fit ">

            <section>
                <h1
                    className=" 
                        font-semibold 
                        mb-5
                        text-neutral-500
                        text-lg
                        ">
                    Select AI Suggested Skill
                </h1>

                <SkillsList />

            </section>

        </div>
        // </motion.div>
    )

}

export default SuggestedSkills