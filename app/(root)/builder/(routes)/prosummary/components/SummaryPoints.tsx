import React from "react";
import SummaryPoint from "./SummaryPoint";
import { getSummary } from "@/actions/get-summary";
import { cookies } from "next/headers";

const SummaryPoints = async () => {
  // const profession = cookies().get("profession")?.value;
  // const {
  //   data: summaries,
  //   error,
  //   isLoading,
  // } = useSWR([profession], getSummary);
  // console.log(summaries, isLoading, error);
  // if (isLoading) return "loading...";
  const profession = cookies().get("profession")?.value;
  const goal = cookies().get("goal")?.value;

  const summaries = await getSummary({ profession, goal });

  const parsedSummaries =
    summaries
      ?.replace(/\d+(\.\s*|\.)?/g, "")
      .split("\n")
      .filter((item: string) => item !== "") || [];
  return (
    <ol
      className="
            list-none 
            text-sm 
            text-neutral-500 
            space-y-5 
            mt-2
            "
    >
      {parsedSummaries.map((bio: string, index: number) => (
        <SummaryPoint bio={bio} key={index} />
      ))}
    </ol>
  );
};

export default SummaryPoints;
