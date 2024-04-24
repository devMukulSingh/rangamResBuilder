"use client";
import { Button } from "@/components/ui/button";
import LinkComp from "@/components/ui/LinkComp";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const Buttons = () => {
  const router = useRouter();
  const selectedSkills = useAppSelector(
    (state) => state.persistedReducer.technicalSkills,
  );
  const handleNavigation = () => {
    if (selectedSkills.length < 6) {
      toast.error("Select atleast 6 skills");
    } else {
      router.push(`/builder/experience`);
    }
  };
  useEffect(() => {
    router.prefetch(`/builder/experience`);
  }, []);
  return (
    <>
      <div className="mt-auto flex justify-between gap-5">
        <LinkComp
          className="w-40  bg-gray-400 text-[#000] hover:bg-gray-300"
          href={"/builder/goals"}
        >
          Back
        </LinkComp>
        <Button className="w-40" onClick={handleNavigation}>
          Next
        </Button>
      </div>
    </>
  );
};

export default Buttons;
