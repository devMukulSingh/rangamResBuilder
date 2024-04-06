import React from "react";
import DownloadSection from "./components/DownloadSection";
import Resume from "./components/Template/Index";

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
      <Resume />
    </main>
  );
};

export default DownloadPage;
