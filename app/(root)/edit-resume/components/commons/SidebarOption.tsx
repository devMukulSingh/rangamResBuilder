"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setFormComp } from "@/redux/slice/commonSlice";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import toast from "react-hot-toast";

interface SidebarOptionProps {
  option: {
    title: string;
    icon: IconType | LucideIcon;
    isActive: boolean;
  };
  sidebar: boolean;
  index: number;
}

const SidebarOption: React.FC<SidebarOptionProps> = ({
  option,
  sidebar,
  index,
}) => {
  const dispatch = useAppDispatch();
  const formComp = useAppSelector((state) => state.commonSlice.formComp);
  const sidebarOptions = useAppSelector(
    (state) => state.commonSlice.sidebarOptions,
  );

  const handleNavigate = () => {
    const beforeComp = sidebarOptions.filter((item) => item.index < index);

    for (let comp of beforeComp) {
      if (!comp.isValidated) {
        toast.error("Form data is required");
        return null;
      }
    }
    dispatch(setFormComp(option.title));
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <li
            onClick={() => handleNavigate()}
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
        {!sidebar && (
          <TooltipContent>
            <p>{option.title}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarOption;
