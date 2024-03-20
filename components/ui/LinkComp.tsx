import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { FC, ReactNode } from 'react'

interface LinkProps {
    href: string,
    disabled?: boolean,
    children: ReactNode
    className?: string
}

const LinkComp: FC<LinkProps> = ({
    href,
    disabled,
    children,
    className
}) => {
    return (

        <Link
            aria-disabled={disabled}
            className={
                cn(
                    `w-40 
                bg-red-400 
                text-primary-foreground 
                hover:bg-red-300 
                inline-flex 
                items-center 
                justify-center 
                whitespace-nowrap
                 rounded-md text-sm 
                 font-medium 
                 ring-offset-background 
                 transition-colors focus-visible:outline-none 
                 focus-visible:ring-2 
                 focus-visible:ring-ring 
                 focus-visible:ring-offset-2 
                 aria-disabled:pointer-events-none 
                 aria-disabled:opacity-50`, className)}
            href={href}
        >
            {children}
        </Link>

    )
}
export default LinkComp