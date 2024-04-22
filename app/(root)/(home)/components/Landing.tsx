"use client";
import LinkComp from "@/components/ui/LinkComp";
import { motion } from "framer-motion";
import Image from "next/image";

const Landing = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: [0, 1], y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full px-5 sm:px-10 lg:px-20 flex flex-col justify-center gap-5 sm:gap-20 py-10 md:flex-row"
      >
        <div className="flex flex-col gap-5 md:w-2/3 w-full">
          <h1 className="text-3xl sm:text-4xl text-[#c75000] font-bold">
            Hi Candidate,
          </h1>
          <h1 className="sm:text-xl text-lg">
            RANGAM will help you build an AI-enabled resume to allow employers
            contact you easily.
          </h1>
          <h1 className="text-lg sm:text-xl mt-5">
            Experience how our AI technology can swiftly evaluate your
            background and generate a professional resume in just 10 minutes.
            Your resume is crucial - make it stand out.
          </h1>
          <LinkComp prefetch={true} className="mt-5" href={"/steps"}>
            Get Started
          </LinkComp>
        </div>
        <figure
          className="
          hidden
          md:block
          relative
          w-[15rem]
          h-[15rem]
          sm:w-[20rem]
          sm:h-[20rem]
          mt-20
          "
        >
          <Image
            fill
            className="object-contain"
            src={"/CV.png"}
            alt="landingImg"
            priority
          />
        </figure>
      </motion.div>
    </>
  );
};

export default Landing;
