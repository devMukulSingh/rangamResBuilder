import { useAppSelector } from "@/redux/hooks/hooks";
import React, { FC } from "react";
import CompDescriptionSkeleton from "./CompDescriptionSkeleton";

interface CompetenceDescriptionProps {
  index: number;
}

const CompetenceDescription: FC<CompetenceDescriptionProps> = ({ index }) => {
  const aiSuggestedCompDesc = useAppSelector(
    (state) => state.persistedReducer.aiSuggestedCompDesc,
  );
  const loading = useAppSelector((state) => state.commonSlice.compDescLoading);

  if (loading) return <CompDescriptionSkeleton />;

  return (
    <ul className="max-h-[15rem] overflow-auto bg-white list-disc px-5 py-5">
      {aiSuggestedCompDesc?.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  );
};

export default CompetenceDescription;
