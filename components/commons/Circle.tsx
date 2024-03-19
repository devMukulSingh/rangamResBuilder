import { cn } from "@/lib/utils"
import { FC, ReactNode } from "react"

interface NumberProps {
    children: ReactNode,
    className?: string
}

const Circle: FC<NumberProps> = ({
    children,
    className
}) => {
    return (
        <>
            <div
                className={
                    cn(
                        `
                        bg-red-400
                        flex
                        shrink-0
                        items-center
                        justify-center
                        text-4xl 
                        rounded-full 
                        text-white
                        w-10
                        h-10
                        shadow-md
                        `,
                        className
                    )
                }
            >
                {children}
            </div >
        </>
    )
}

export default Circle