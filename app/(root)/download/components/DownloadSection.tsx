import Link from "next/link";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import DownloadButtons from "./DownloadButtons";

const DownloadSection = ({}) => {
  return (
    <div
      className="flex flex-col gap-10 md:gap-20 w-full md:w-1/3  
        h-fit  md:h-[calc(100vh-8.5rem)] print:hidden 
        "
    >
      <Link href={`/builder/education`}>
        <BiArrowBack className="cursor-pointer" size={30} />
      </Link>
      <section className="flex flex-col gap-5 lg:px-10 md:px-5 px-5 h-full ">
        <h1 className="text-3xl lg:text-4xl font-bold">Contratulations!</h1>
        <h1 className="text-xl text-neutral-600">
          Your resume is ready for download.
        </h1>
        <DownloadButtons />
      </section>
    </div>
  );
};

export default DownloadSection;
