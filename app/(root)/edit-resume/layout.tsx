'use client'
import { useAppSelector } from "@/redux/hooks/hooks"
const Resume = dynamic(() => import('./components/Resume/Resume'), { ssr: false })
import Sidebar from "./components/commons/Sidebar"
import dynamic from "next/dynamic"


export default function TemplateLayout({ children }: {
    children: React.ReactNode
}) {
    const sidebar = useAppSelector(state => state.commonSlice.sidebar);
    return (
        <div className="flex gap-5 max-h-[100vh] overflow-hidden relative">
            <Sidebar />
            <div className={`md:flex-row flex flex-col w-full ${!sidebar ? 'ml-[7rem]' : 'ml-[20rem]'} `} >
                <div className="w-[30rem] no-scrollbar max-h-[calc(100vh-6rem)] overflow-auto">
                    {children}
                </div>
                <Resume />
            </div>
        </div>
    )
}