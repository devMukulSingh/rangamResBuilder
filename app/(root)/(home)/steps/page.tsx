"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Steps from "./components/Steps";
import { motion } from "framer-motion";
import { resetForm } from "@/redux/slice/userSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";

const StepsPage = () => {
  const dispatch = useAppDispatch();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: [0, 1], y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex  lg:px-20 sm:px-10 px-5 py-10 "
    >
      <div className="flex flex-col gap-8 w-full md:w-2/3 ">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#c75000]">
          3 steps to create a resume
        </h1>

        <Steps />

        <Link
          className="self-center md:self-end w-60 h-10"
          href={"/builder/personal"}
        >
          <Button onClick={() => dispatch(resetForm())} className="w-full">
            Create a RESUME
          </Button>
        </Link>
      </div>

      <figure
        className="
                relative
                size-[25rem] 
                self-center
                hidden
                md:block
                "
      >
        <Image
          fill
          className="object-contain"
          alt="resumeImg"
          src={"/3Steps.png"}
          priority
        />
      </figure>
    </motion.div>
  );
};

export default StepsPage;
