import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Steps from "./components/Steps";

const StepsPage = () => {
  return (
    <div className="flex md:px-20 sm:px-10 px-5 py-10 ">
      <div className="flex flex-col gap-8 w-full md:w-2/3 ">
        <h1 className="text-3xl sm:text-4xl font-bold">
          3 steps to create a resume
        </h1>

        <Steps />

        <Link
          className="self-center md:self-end w-60 h-10"
          href={"/builder/personal"}
        >
          <Button className="w-full">Create a RESUME</Button>
        </Link>
      </div>

      <figure
        className="
                relative
                size-[20rem] 
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
        />
      </figure>
    </div>
  );
};

export default StepsPage;
