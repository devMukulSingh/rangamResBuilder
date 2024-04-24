import Circle from "@/components/commons/Circle";
import Skills from "./components/Skills";
import Buttons from "./components/Buttons";

const SkillsPage = async () => {
  return (
    <>
      <div
        className="
        flex 
        flex-col
        gap-5 
        min-h-[calc(100vh-6rem)]
        lg:px-20
        sm:px-15
        px-5
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
                text-[#c75000]
                "
            >
              Skills
            </h1>
          </div>

          <h1 className="text-lg sm:text-xl text-black">
            We found recommended skills for you. Let's find relevant skills for
            the job you are applying for. <br />
            Listing 6-10 skills is best.
          </h1>
        </header>

        <Skills />

        <Buttons />
      </div>
    </>
  );
};

export default SkillsPage;
