'use client'
import { useAppDispatch } from '@/redux/hooks/hooks'
import { setSelectedBio } from '@/redux/slice/userSlice'
import {  Plus } from 'lucide-react'
import React, { FC } from 'react'
import Circle from '@/components/commons/Circle'

interface SummaryPointProps {
    bio: string
}

const SummaryPoint: FC<SummaryPointProps> = ({
    bio
}) => {
    const dispatch = useAppDispatch();
    return (
        <>
            <li
                className="
                                min-h-20
                                relative
                                bg-white
                                text-neutral-500
                                p-4
                                rounded-sm
                                "
            >
                {bio}
                <Circle
                    onClick={() => dispatch(setSelectedBio(bio))}
                    className="
                                cursor-pointer
                                absolute
                                right-[-20px]
                                top-[29%]
                                "
                >
                    <Plus />
                </Circle>
            </li>
        </>
    )
}

export default SummaryPoint