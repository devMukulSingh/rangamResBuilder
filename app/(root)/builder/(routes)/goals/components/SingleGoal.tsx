import Image from "next/image"

interface SingleGoalProps{
    goal:{
        title:string,
        img:string
    }
}

const SingleGoal:React.FC<SingleGoalProps> = ({
    goal
}) => {
  return (
    <div 
        className="flex
        cursor-pointer
        flex-col 
        gap-5 
        p-5 
      bg-red-100
      rounded-lg
        h-[18rem]
        ">
        {/* <Image 
            alt="goalImg" 
            height={100} 
            width={100} 
            src={goal.img}
            /> */}
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