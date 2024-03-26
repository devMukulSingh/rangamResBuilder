import Circle from "@/components/commons/Circle";

const TextSection = () => {
  return (
    <div className="w-full md:w-1/2 flex flex-col gap-8">
      <div className="flex gap-5">
        <Circle>1</Circle>
        <h1 className="text-4xl font-bold text-[#c75000]">
          Let's get started!
        </h1>
      </div>
      <h1 className="text-lg font-semibold text-black">
        Complete your resume heading
      </h1>
      <h1 className="text-lg font-semibold text-black">
        Your resume is a reflection of your <br />
        professional identity. <br />
        <span className=" font-bold">Let's make sure it shines!</span>
      </h1>
    </div>
  );
};

export default TextSection;
