import { FC, ReactNode } from "react"

interface NumberProps {
    children: ReactNode
}

const Circle: FC<NumberProps> = ({
    children
}) => {
    return (
        <>
            <div
                className='bg-red-400
                    flex
                    items-center
                    justify-center
                    text-4xl 
                rounded-full 
                text-white
                w-10
                h-10
                shadow-md
                '>
                {children}
            </div>
        </>
    )
}

export default Circle