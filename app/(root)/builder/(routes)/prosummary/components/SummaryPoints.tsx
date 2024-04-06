"use client";
import React from "react";
import SummaryPoint from "./SummaryPoint";
import BioSkeleton from "./BioSkeleton";
import useSWR from "swr";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks/hooks";

type Ifetcher = [url: string, profession: string, goal: string];

const SummaryPoints = () => {
  const fetcher = ([url, profession, goal]: Ifetcher) =>
    axios.get(url, { params: { profession, goal } }).then((res) => res.data);

  const profession = useAppSelector(
    (state) => state.persistedReducer.personalInfo.profession,
  );
  const goal = useAppSelector((state) => state.persistedReducer.goal);

  const { data, isLoading, error } = useSWR(
    [`/api/ai/get-summary`, profession, goal],
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
    },
  );

  if (error) {
    console.log(`Error in get Summary ${error.message}`);
    return;
  }

  return (
    <>
      {isLoading || !data ? (
        <BioSkeleton />
      ) : (
        <ol
          className="
      list-none 
            text-sm 
            text-neutral-500 
            space-y-5 
            mt-2
            "
        >
          {data?.map((bio: string, index: number) => (
            <SummaryPoint bio={bio} key={index} />
          ))}
        </ol>
      )}
    </>
  );
};

export default SummaryPoints;
