import React from "react";
import DownloadSection from "./components/DownloadSection";
import Template1 from "./components/Template/Template1";

const DownloadPage = () => {
  return (
    <main
      className="md:flex-row 
    flex 
    flex-col 
    gap-20 
    md:gap-10 w-full 
    py-10 
    lg:px-10 
    px-5
    print:p-0 
    justify-between "
    >
      <DownloadSection />
      <Template1 />
    </main>
  );
};

export default DownloadPage;
