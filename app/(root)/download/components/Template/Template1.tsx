import dynamic from "next/dynamic";
const About = dynamic(() => import("./About"), { ssr: false });
const Experience = dynamic(() => import("./Experience"), { ssr: false });
const Project = dynamic(() => import("./Project"), { ssr: false });
const Education = dynamic(() => import("./Education"), { ssr: false });
const Skills = dynamic(() => import("./Skills"), { ssr: false });

const Template1 = () => {
  return (
    <>
      <div
        id="template1"
        className="
                md:w-2/3
                whitespace-nowrap 
                text-sm 
                print:m-0
                min-w-[45rem]
                max-w-[50rem]
                bg-white
                print:h-screen
                print:w-screen
                print:p-0
                min-h-[100vh]
                "
      >
        <hr className="h-4 bg-blue-400 w-full border-none" />
        <div className="flex flex-col gap-5 py-5 px-14">
          <About />
          <Experience />
          <Education />
          {/* <Project /> */}
          <Skills />
        </div>
      </div>
    </>
  );
};

export default Template1;
