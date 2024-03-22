"use client";
import Image from "next/image";

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
    <div
      onClick={handleGoalSelect}
      className={`
        transition
        flex
        cursor-pointer
        flex-col 
        gap-5 
        px-10
        py-10
        sm:w-auto
        w-[20rem] 
      bg-red-100
      rounded-lg
        h-[18rem]
        ${selected === goal.title ? "bg-red-300 transition scale-90" : ""}
        `}
    >
      <figure
        className="
        relative
        w-full
        h-full
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
  );
};

export default SingleGoal;
