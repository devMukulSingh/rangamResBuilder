import SelectComp from "./SelectComp";
import dynamic from "next/dynamic";
import BioSkeleton from "./BioSkeleton";
const SummaryPoints = dynamic(() => import("./SummaryPoints"), {
  loading: () => <BioSkeleton />,
});

const SuggestedSummary = async () => {
  return (
    <div className="flex flex-col gap-3 p-5 ">
      <h1 className="font-semibold">Select Career Field</h1>
      <SelectComp />
      <SummaryPoints />
    </div>
  );
};

export default SuggestedSummary;
