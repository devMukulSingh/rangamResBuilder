"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setFormComp } from "@/redux/slice/commonSlice";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ReactNode, useState } from "react";
import { IconType } from "react-icons/lib";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarOptionProps {
  option: {
    title: string;
    icon: IconType | LucideIcon;
    isActive: boolean;
  };
  sidebar: boolean;
}

const SidebarOption: React.FC<SidebarOptionProps> = ({ option, sidebar }) => {
  const dispatch = useAppDispatch();
  const formComp = useAppSelector((state) => state.commonSlice.formComp);

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <li
            onClick={() => dispatch(setFormComp(option.title))}
            className={`
        ${option.title === formComp ? "bg-red-100" : ""}
        flex 
        gap-3 
        hover:bg-red-100 
        px-10 py-4 items-center 
        cursor-pointer
        whitespace-nowrap
        `}
          >
            <option.icon className="text-xl" />
            {sidebar && option.title}
          </li>
        </TooltipTrigger>
        {
          !sidebar &&
          <TooltipContent >
          <p>{option.title}</p>
        </TooltipContent>
        }
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarOption;
