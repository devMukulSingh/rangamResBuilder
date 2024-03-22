import ExperienceForm from "@/app/(root)/builder/(routes)/experience/components/ExperienceForm";
import Circle from "@/components/commons/Circle";
import { cookies } from "next/headers";
import { ChatGPT } from "@/lib/ChatGPT";

const ExperiencePage = async () => {
  // const parsedCompetences = [
  //     'Data analysis',
  //     'Machine learning',
  //     'Statistical modeling',
  //     'Data visualization',
  //     'Predictive analytics',
  //     'Data mining',
  //     'Big data management'
  // ]

  return (
    <div
      className="
        flex 
        flex-col
        gap-5 
        border
        min-h-[calc(100vh-6rem)]
        px-10
        sm:px-20
        py-10
        w-full
        "
    >
      <div className="flex gap-5">
        <Circle>4</Circle>
        <h1
          className="
                text-3xl
                sm:text-4xl
                font-bold
                "
        >
          Experience
        </h1>
      </div>
      <h1 className="text-lg sm:text-xl text-neutral-600">
        Your experience tells a story of your career progression. Share the
        details and let's capture the essence of your expertise together.
      </h1>

      <ExperienceForm />
    </div>
  );
};

export default ExperiencePage;
