"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
const Resume = dynamic(() => import("./components/Resume/Resume"), {
  ssr: false,
});
import Sidebar from "./components/commons/Sidebar";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { setSidebar, toggleSidebar } from "@/redux/slice/commonSlice";

export default function TemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebar = useAppSelector((state) => state.commonSlice.sidebar);
  const dispatch = useAppDispatch();
  const [showResume, setShowResume] = useState(false);
  return (
    <div className="flex gap-5 max-h-[calc(100vh-6rem)] overflow-hidden relative no-scrollbar">
      <Sidebar />
      <div
        className={`md:flex-row flex flex-col w-full ${!sidebar ? "ml-[7rem]" : "ml-[18rem] lg:ml-[20rem]"} `}
      >
        <div
          className={` ${showResume ? "min-w-[25rem]" : "w-full"} no-scrollbar max-h-[calc(100vh-6rem)] overflow-auto `}
        >
          {children}
        </div>
        <div className="flex flex-col py-5 px-5">
          <Button
            variant="ghost"
            onClick={() => {
              dispatch(setSidebar(false));
              setShowResume((prev) => !prev);
            }}
          >
            {showResume ? "Hide Preview" : "Show Preview"}
          </Button>
          {showResume && <Resume />}
        </div>
      </div>
    </div>
  );
}
