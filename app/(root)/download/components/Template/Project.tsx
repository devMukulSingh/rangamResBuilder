"use client";
import { HTMLRenderer } from "@/lib/HTMLRenderer";
import { useAppSelector } from "@/redux/hooks/hooks";
import React from "react";

const Project = () => {
  const projects = useAppSelector((state) => state.persistedReducer.projects);
  if (!projects || projects?.length === 0) return null;
  return (
    <section className="space-y-1">
      <div className="flex items-center gap-5">
        <hr className="h-2 border-none bg-blue-400 w-14" />
        <h1 className=" font-bold">Projects</h1>
      </div>
      {projects?.map((item, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h1 className="font-bold">{item.projectName}</h1>
            <h1>{item.projectUrl}</h1>
          </div>
          <HTMLRenderer htmlString={item.description} />
        </div>
      ))}
    </section>
  );
};

export default Project;
