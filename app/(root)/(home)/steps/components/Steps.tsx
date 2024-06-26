import { Separator } from "@/components/ui/separator";
import React from "react";

const Steps = () => {
  return (
    <ul className="px-5 flex flex-col gap-5 list-none text-black">
      <li className="flex gap-3 overflow-clip">
        <div className="flex flex-col gap-2 items-center ">
          <span className="border-2 border-[#c75000] rounded-full w-10 min-h-10 flex items-center justify-center ">
            1
          </span>
          <Separator className="bg-[#c75000] min-h-8" orientation="vertical" />
        </div>

        <h1 className="mt-1 text-md sm:text-lg font-semibold">
          Enter your personal info and help recruiters contact you
        </h1>
      </li>
      <li className="flex gap-3 overflow-clip">
        <div className="flex flex-col gap-2 items-center ">
          <span className="border-2 border-[#c75000] rounded-full w-10 min-h-10 flex items-center justify-center ">
            2
          </span>
          <Separator className="bg-[#c75000]" orientation="vertical" />
        </div>

        <div className="flex flex-col gap-5">
          <h1 className=" text-md sm:text-lg font-semibold mt-1">
            Take a questionnaire and get the resume
          </h1>
          <ul className="list-disc pl-5 sm:text-md text-sm text-black">
            <li>Enter a desired job title</li>
            <li>
              Tell us about your previous experience (only company name, dates
              of employment in the company, university name)
            </li>
            <li>Pick the skills that describe you the most</li>
          </ul>
        </div>
      </li>
      <li className="flex gap-3 overflow-clip">
        <div className="flex flex-col gap-2 items-center">
          <span className="border-2 border-[#c75000] rounded-full w-10 min-h-10 flex items-center justify-center ">
            3
          </span>
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="mt-1 text-md sm:text-lg font-semibold">
            Let RANGAM’s AI-tool make the rest!
          </h1>
        </div>
      </li>
    </ul>
  );
};

export default Steps;
