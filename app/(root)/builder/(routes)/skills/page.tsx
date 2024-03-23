import Circle from "@/components/commons/Circle";
import LinkComp from "@/components/ui/LinkComp";
import Skills from "./components/Skills";

const SkillsPage = async () => {
  return (
    <>
      <div
        className="
        flex 
        flex-col
        gap-5 
        h-[calc(100vh-6rem)]
        lg:px-20
        sm:px-15
        px-10
        py-10
        w-full
        "
      >
        <header className="flex flex-col gap-5">
          <div className="flex gap-5">
            <Circle>3</Circle>
            <h1
              className="
                text-4xl
                font-bold
                "
            >
              Skills
            </h1>
          </div>

          <h1 className="text-lg sm:text-xl text-neutral-600">
            We found recommended skills for you. Let's find relevant skills for
            the job you are applying for. <br />
            Listing 6-10 skills is best.
          </h1>
        </header>

        <Skills />

        <div className="mt-auto flex justify-between">
          <LinkComp
            className="w-40  bg-gray-400 hover:bg-gray-300"
            href={"/builder/goals"}
          >
            Back
          </LinkComp>
          <LinkComp className="w-40" href={"/builder/experience"}>
            Next
          </LinkComp>
        </div>
      </div>
    </>
  );
};

export default SkillsPage;
