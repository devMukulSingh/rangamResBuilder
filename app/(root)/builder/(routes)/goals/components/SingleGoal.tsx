import Image from "next/image"

interface SingleGoalProps {
  goal: {
    title: string,
    img: string
  }
}

const SingleGoal: React.FC<SingleGoalProps> = ({
  goal
}) => {
  return (
    <div
      className="flex
        cursor-pointer
        flex-col 
        gap-5 
        px-10
        py-10 
      bg-red-100
      rounded-lg
        h-[18rem]
        ">
      <figure
        className="
        relative
        w-full
        h-full
        "
      >
        <Image
          alt="goalImg"
          fill
          className="object-contain"
          src={goal.img}
        />
      </figure>
      <h1
        className="mt-auto
                text-xl
                text-neutral-600 
                font-semibold
                text-center
                ">
        {goal.title}
      </h1>
    </div>
  )
}

export default SingleGoal