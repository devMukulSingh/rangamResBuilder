import PersonalForm from "./components/PersonalForm";
import TextSection from "./components/TextSection";

const BuilderPage = () => {
  return (
    <div className=" md:flex-row gap-10 lg:gap-20 md:items-start items-center flex flex-col justify-center w-full py-16 lg:px-32 md:px-20 px-10">
      <TextSection />
      <PersonalForm />
    </div>
  );
};

export default BuilderPage;
