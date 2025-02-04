"use client";
import React from "react";
import { HTMLRenderer } from "@/components/commons/HTMLRenderer";
import { useAppSelector } from "@/redux/hooks/hooks";
import { format } from "date-fns";

interface ExperienceSectionProps {}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({}) => {
  const experience = useAppSelector(
    (state) => state.persistedReducer.experience,
  );

  return (
    <div className="space-y-4 bg-white p-5 ">
      <h1 className=" text-xl font-semibold">Work Experience</h1>
      {experience?.map((item, index) => (
        <div className="flex flex-col gap-5 " key={index}>
          <div>
            <h1 className="font-bold">{item.jobTitle || ""}</h1>
            <h1>
              {`${item.startDate ? format(item?.startDate, "MMM yyyy") : ""} `}
              {`${item.checkboxWorkingStatus && item.startDate ? " - present" : `${item.endDate ? `- ${format(item?.endDate, "MMM yyyy")}` : ""}  `} `}
            </h1>
          </div>
          <HTMLRenderer htmlString={item.description} />
        </div>
      ))}
    </div>
  );
};

export default ExperienceSection;
