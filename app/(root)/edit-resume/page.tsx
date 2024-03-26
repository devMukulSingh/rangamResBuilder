import dynamic from "next/dynamic";
const MainComp = dynamic(() => import("./components/main/MainComp"));

const BuilderPage = async () => {
  return (
    <>
      <MainComp />
    </>
  );
};

export default BuilderPage;
