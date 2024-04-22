"use client";
import { useState } from "react";
import SingleGoal from "./SingleGoal";
import LinkComp from "@/components/ui/LinkComp";
import { setGoal } from "@/redux/slice/userSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setGoalInCookies } from "@/actions/set-goal";

const Goals = () => {
  const [selected, setSelected] = useState("");
  const goals = [
    {
      title: "Experienced",
      img: "/experienced.png",
    },
    {
      title: "Young professional",
      img: "/young.png",
    },
    {
      title: "Student",
      img: "/Student.png",
    },
    {
      title: "Others",
      img: "/Others.png",
    },
  ];
  const dispatch = useAppDispatch();
  const handleGoalSelect = async () => {
    await setGoalInCookies(selected);
    dispatch(setGoal(selected));
  };
  return (
    <>
      <div
        className="
    grid 
    lg:grid-cols-4
    md:grid-cols-3
    sm:grid-cols-2
    grid-cols-1 
    gap-10 
    mt-10
    
    "
      >
        {goals.map((goal, index) => (
          <SingleGoal
            selected={selected}
            setSelected={setSelected}
            key={index}
            goal={goal}
          />
        ))}
      </div>

      <div className="mt-auto flex justify-between">
        <LinkComp
        
          className="w-40 bg-[#C7C3C3] text-[#000] hover:bg-gray-300"
          href={"/builder/personal"}
        >
          Back
        </LinkComp>
        <LinkComp
          onClick={handleGoalSelect}
          disabled={selected === "" ? true : false}
          href={"/builder/skills"}
        >
          Next
        </LinkComp>
      </div>
    </>
  );
};

export default Goals;
