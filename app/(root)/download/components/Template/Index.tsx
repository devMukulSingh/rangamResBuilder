import LinkComp from "@/components/ui/LinkComp";
import dynamic from "next/dynamic";
import Achievements from "./Achievements";
const About = dynamic(() => import("./About"), { ssr: false });
const Experience = dynamic(() => import("./Experience"), { ssr: false });
const Project = dynamic(() => import("./Project"), { ssr: false });
const Education = dynamic(() => import("./Education"), { ssr: false });
const Skills = dynamic(() => import("./Skills"), { ssr: false });

const Index = () => {
  return (
    <div className="flex flex-col gap-2">
      <LinkComp
        href={"/edit-resume"}
        className="justify-start
         font-semi-bold
          text-blue-500 
          w-32 
          print:hidden
          hover:text-blue-500
          hover:bg-transparent
          bg-transparent
          "
      >
        Edit
      </LinkComp>
      <div
        id="template1"
        className="
                md:w-2/3
                text-sm 
                print:m-0
                min-w-[45rem]
                max-w-[50rem]
                bg-white
                print:h-screen
                print:w-screen
                print:p-0
                h-[1075px]
                "
      >
        <hr className="h-4 bg-blue-400 w-full print:w-screen border-none" />
        <div className="flex flex-col gap-5 py-5 px-14">
          <About />
          <Experience />
          <Education />
          <Skills />
          <Project />
          <Achievements />
        </div>
      </div>
    </div>
  );
};

export default Index;
