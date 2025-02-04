import Circle from "@/components/commons/Circle";
import EducationForm from "./components/EducationForm";

const EducationPage = () => {
  return (
    <div
      className="
        flex 
        flex-col
        gap-5 
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
          <Circle>6</Circle>
          <h1
            className="
            sm:text-4xl
            text-3xl
            font-bold
            text-[#c75000]
            "
          >
            Education
          </h1>
        </div>
        <h1 className="text-lg sm:text-xl text-black">
          Please enter your university/school name.
        </h1>
      </header>

      <EducationForm />
    </div>
  );
};

export default EducationPage;
