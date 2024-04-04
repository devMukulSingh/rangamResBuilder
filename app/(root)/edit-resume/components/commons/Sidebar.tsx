"use client";
import { MdOutlineSort } from "react-icons/md";
import SidebarOption from "./SidebarOption";
import { Contact, GraduationCap, Languages, User } from "lucide-react";
import { BiCertification } from "react-icons/bi";
import { FaDiagramProject, FaUserPen } from "react-icons/fa6";
import { GiSkills } from "react-icons/gi";
import { usePathname } from "next/navigation";
import {
  setShowSidebarOptions,
  toggleSidebar,
} from "@/redux/slice/commonSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const sidebar = useAppSelector((state) => state.commonSlice.sidebar);
  const pathName = usePathname();
  const showOptions = useAppSelector(
    (state) => state.commonSlice.showSidebarOptions
  );
  const halfOptions = [
    {
      icon: User,
      title: "Personal Information",
      isActive: pathName.endsWith("/personal"),
    },
    {
      icon: FaUserPen,
      title: "Experience",
      isActive: pathName.endsWith("/experience"),
    },
    {
      icon: GiSkills,
      title: "Skills",
      isActive: pathName.endsWith("/skills"),
    },
    {
      icon: GraduationCap,
      title: "Education",
      isActive: pathName.endsWith("/education"),
    },
  ];
  const [sidebarOptions, setSidebarOptions] = useState(halfOptions);

  const extraOptions = [
    {
      icon: Contact,
      title: "Social Links",
      isActive: pathName.endsWith("/social"),
    },
    {
      icon: FaDiagramProject,
      title: "Projects",
      isActive: pathName.endsWith("/projects"),
    },
    {
      icon: BiCertification,
      title: "Achievements",
      isActive: pathName.endsWith("achievements"),
    },
    {
      icon: Languages,
      title: "Language",
      isActive: pathName.endsWith("/language"),
    },
  ];
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      dispatch(toggleSidebar());
    }
  }, []);
  return (
    // <motion.div
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: [0, 1], scale: [0.9, 1] }}
    //   transition={{ duration: 0.4 }}
    // >
    <div
      className={`flex flex-col h-[calc(100vh-6.5rem)] bg-white py-3 fixed transition-all ${
        sidebar ? "w-[18rem] lg:w-[20rem]" : "w-[7rem]"
      }  `}
    >
      <MdOutlineSort
        onClick={() => dispatch(toggleSidebar())}
        className={`
                size-8
                cursor-pointer
                ${sidebar ? "ml-auto mr-5" : " mr-0 ml-0 mb-5 self-center"}
                `}
      />
      <ul className="">
        {sidebarOptions.map((option, index) => (
          <SidebarOption
            option={option}
            key={index}
            index={index}
            sidebar={sidebar}
          />
        ))}
        {showOptions &&
          extraOptions.map((option, index) => (
            <SidebarOption
              index={index + 4}
              option={option}
              key={index}
              sidebar={sidebar}
            />
          ))}
      </ul>
      <Button
        className={`mx-10 self-center mt-5 w-4/5`}
        onClick={() => dispatch(setShowSidebarOptions())}
      >
        {showOptions ? "Hide" : "Show More"}
      </Button>
    </div>
    // </motion.div>
  );
};

export default Sidebar;
