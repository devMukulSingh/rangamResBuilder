import React from "react";
import SummaryPoint from "./SummaryPoint";
import { getSummary } from "@/actions/get-summary";

const SummaryPoints = async () => {
  const summaries = await getSummary();
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
