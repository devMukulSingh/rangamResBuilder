"use client";
import { Button } from "@/components/ui/button";
import LinkComp from "@/components/ui/LinkComp";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const Buttons = () => {
  const router = useRouter();
  const selectedBio = useAppSelector(
    (state) => state.persistedReducer.personalInfo.bio,
  );

  const parsed = selectedBio?.replace(/(<([^>]+)>)/gi, "");
  const handleNavigation = () => {
    if (parsed && parsed !== "") {
      router.push(`/builder/education`);
    } else {
      toast.error("Bio is required");
    }
  };
  useEffect(() => {
    router.prefetch(`/builder/education`);
  }, []);
  return (
    <>
      <div className="mt-auto flex justify-between gap-5">
        <LinkComp
          className="w-40  bg-gray-400 text-[#000] hover:bg-gray-300"
          href={"/builder/experience"}
        >
          Back
        </LinkComp>
        <Button
          disabled={!parsed || parsed === "" ? true : false}
          className="w-40"
          onClick={handleNavigation}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Buttons;
