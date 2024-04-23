"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface SingleGoalProps {
  goal: {
    title: string;
    img: string;
  };
  selected: string;
  setSelected: (selected: string) => void;
}

const SingleGoal: React.FC<SingleGoalProps> = ({
  goal,
  selected,
  setSelected,
}) => {
  const handleGoalSelect = () => {
    if (selected === goal.title) {
      setSelected("");
    } else {
      setSelected(goal.title);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: [0, 1], scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex justify-center"
    >
      <div
        onClick={handleGoalSelect}
        className={`
        transition
        flex
        items-center
        cursor-pointer
        flex-col 
        gap-5 
        px-5
        py-5
        lg:w-[90%]
        md:w-full
        w-[15rem] 
      bg-red-100
      rounded-lg
      h-[16rem]
        ${selected === goal.title ? "bg-red-300 transition scale-90" : ""}
        `}
      >
        <figure
          className="
          relative
          w-[10rem]
          h-[10rem]
          "
        >
          <Image alt="goalImg" fill className="object-contain" src={goal.img} />
        </figure>
        <h1
          className="mt-auto
          text-xl
          text-neutral-600 
                font-semibold
                text-center
                "
        >
          {goal.title}
        </h1>
      </div>
    </motion.div>
  );
};

export default SingleGoal;
