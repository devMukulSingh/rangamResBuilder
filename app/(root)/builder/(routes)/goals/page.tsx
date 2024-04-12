import React from "react";
import Circle from "@/components/commons/Circle";
import Goals from "./components/Goals";

const GoalsPage = async ({
  searchParams,
}: {
  searchParams: { profession: string };
}) => {
  return (
    <div
      className="
        flex 
        flex-col 
        gap-5 
        border
        h-[calc(100vh-6rem)]
        md:px-20
        px-10
        py-10
        w-full
        "
    >
      <header className="flex flex-col gap-5">
        <div className="flex gap-5">
          <Circle>2</Circle>
          <h1
            className="
                sm:text-4xl
                text-3xl
                text-[#c75000]
                font-bold
                "
          >
            Tailor your resume to your career goals
          </h1>
        </div>
        <h1 className="text-lg sm:text-xl text-black">
          Select your employment and help us make &nbsp;
          <span className="font-bold">the most relevant resume</span>
          &nbsp; for you
        </h1>
      </header>

      <Goals />
      
    </div>
  );
};

export default GoalsPage;
