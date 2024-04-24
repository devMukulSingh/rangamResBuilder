"use client";
import { useState } from "react";
import SingleGoal from "./SingleGoal";
import LinkComp from "@/components/ui/LinkComp";
import { setGoal } from "@/redux/slice/userSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";
import axios from "axios";
import useSWRMutation from "swr/mutation";
import Loader from "@/components/commons/Loader";

const Goals = () => {
  async function sendRequest(
    url: string,
    { arg }: { arg: { selectedGoal: string } }
  ) {
    return await axios.post(url, {
      goal: arg.selectedGoal,
    });
  }
    const { trigger, isMutating } = useSWRMutation(
      `/api/set-goal`,
      sendRequest,
    );
  const [selectedGoal, setSelectedGoal] = useState("");
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
    dispatch(setGoal(selectedGoal));
    await trigger({selectedGoal});
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
    
    "
      >
        {goals.map((goal, index) => (
          <SingleGoal
            selectedGoal={selectedGoal}
            setSelectedGoal={setSelectedGoal}
            key={index}
            goal={goal}
          />
        ))}
      </div>

      <div className="mt-auto flex justify-between gap-5">
        <LinkComp
          className="w-40 bg-[#C7C3C3] text-[#000] hover:bg-gray-300"
          href={"/builder/personal"}
        >
          Back
        </LinkComp>
        <LinkComp
          className="flex gap-5"
          onClick={handleGoalSelect}
          disabled={(selectedGoal === "" || isMutating) ? true : false}
          href={"/builder/skills"}
        >
          Next
          {
            isMutating && <Loader/>
          }
        </LinkComp>
      </div>
    </>
  );
};

export default Goals;
