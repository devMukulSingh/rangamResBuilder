"use client";
import { Button } from "@/components/ui/button";
import LinkComp from "@/components/ui/LinkComp";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";
import React from "react";
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
  return (
    <div>
      <div className="mt-auto flex justify-between">
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
    </div>
  );
};

export default Buttons;