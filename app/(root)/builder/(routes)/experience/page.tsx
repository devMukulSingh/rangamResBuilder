import ExperienceForm from "@/app/(root)/builder/(routes)/experience/components/ExperienceForm";
import Circle from "@/components/commons/Circle";

const ExperiencePage = async () => {
  return (
    <div
      className="
        flex 
        flex-col
        gap-5 
        border
        min-h-[calc(100vh-6rem)]
        lg:px-10
        md:px-8
        sm:px-10
        px-5
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
                text-[#c75000]
                "
        >
          Experience
        </h1>
      </div>
      <h1 className="text-lg sm:text-xl text-black">
        Your experience tells a story of your career progression. Share the
        details and let's capture the essence of your expertise together.
      </h1>

      <ExperienceForm />
      
    </div>
  );
};

export default ExperiencePage;
