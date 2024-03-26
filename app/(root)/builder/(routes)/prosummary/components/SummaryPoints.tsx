import React from "react";
import SummaryPoint from "./SummaryPoint";
import { cookies } from "next/headers";
import { ChatGPT } from "@/lib/ChatGPT";

const SummaryPoints = async () => {
  const profession = cookies().get("profession")?.value || "Frontend dev";
  const bioPrompt = `Suggest 3 short bio for ${profession} for resume`;
  const bio = await ChatGPT(bioPrompt);

  const parsedBio =
    bio
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
      {parsedBio.map((bio: string, index: number) => (
        <SummaryPoint bio={bio} key={index} />
      ))}
    </ol>
  );
};

export default SummaryPoints;
