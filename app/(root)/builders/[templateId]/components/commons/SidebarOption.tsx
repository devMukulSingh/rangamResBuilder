'use client'
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setFormComp } from "@/redux/slice/commonSlice";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ReactNode, useState } from "react";
import { IconType } from "react-icons/lib";

interface SidebarOptionProps {
    option: {
        title: string,
        icon: IconType | LucideIcon,
        isActive: boolean,
    },
    sidebar: boolean,

}

const SidebarOption: React.FC<SidebarOptionProps> = ({
    option,
    sidebar,
}) => {
    const dispatch = useAppDispatch();
    const { templateId } = useParams();
    const formComp = useAppSelector( state => state.commonSlice.formComp);


    return (
            <li
            onClick={  () => dispatch(setFormComp(option.title)) } 
            
            className={`
        ${option.title===formComp ? 'bg-red-100' : ''}
        flex 
        gap-3 
        hover:bg-red-100 
        px-10 py-4 items-center 
        cursor-pointer
        whitespace-nowrap
        `}>
                <option.icon className="text-xl" />
                {sidebar && option.title}
            </li>

    )
}

export default SidebarOption