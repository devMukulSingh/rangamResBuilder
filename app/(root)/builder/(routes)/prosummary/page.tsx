import Circle from "@/components/commons/Circle";
import LinkComp from "@/components/ui/LinkComp";
import MainSummary from "./components/MainSummary";

const ProSummaryPage = async () => {
  return (
    <div
      className="
        flex 
        flex-col
        lg:gap-5
        gap-3 
        border
        min-h-[calc(100vh-6rem)]
        lg:px-20
        md:px-10
        px-5
        py-10
        w-full
        "
    >
      <header className="flex flex-col gap-5">
        <div className="flex gap-5">
          <Circle>5</Circle>
          <h1
            className="
                    text-4xl
                    font-bold
                    text-[#c75000]
                    "
          >
            Professional Summary
          </h1>
        </div>
        <h1 className="text-xl text-black">
          Write a short summary telling more about yourself, your strengths{" "}
          <br />
          and experience or select our generated personalized summary for you.
        </h1>
      </header>

      <MainSummary />

      <div className="mt-auto flex justify-between">
        <LinkComp
          className="w-40  bg-gray-400 text-[#000] hover:bg-gray-300"
          href={"/builder/experience"}
        >
          Back
        </LinkComp>
        <LinkComp className="w-40" href={"/builder/education"}>
          Next
        </LinkComp>
      </div>
    </div>
  );
};

export default ProSummaryPage;
