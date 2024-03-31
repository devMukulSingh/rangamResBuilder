"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import React from "react";

const Achievements = () => {
  const achievements = useAppSelector(
    (state) => state.persistedReducer.achievements
  );
  if (!achievements || achievements.length === 0) return null;
  return (
    <section className="space-y-1  bg-white ">
      <div className="flex items-center gap-5">
        <hr className="h-2 border-none bg-blue-400 w-14" />
        <h1 className=" font-bold">Achievements</h1>
      </div>
      <ul className="list-disc pl-5 ">
        {achievements?.map((achievement, index) => {
          if (achievement.value === "") return null;
          return <li key={index}>{achievement.value}</li>;
        })}
      </ul>
    </section>
  );
};

export default Achievements;
