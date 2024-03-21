'use client'
import React, { useState } from 'react'
import SingleGoal from './SingleGoal'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/redux/hooks/hooks'
import LinkComp from '@/components/ui/LinkComp'

const Goals = () => {
    const profession = useAppSelector(state => state.persistedReducer.personalInfo.profession);
    const [selected, setSelected] = useState("");
    const router = useRouter();
    const goals = [
        {
            title: 'Experienced',
            img: '/Fulltime.png'
        },
        {
            title: 'Young Professional',
            img: '/Young.png'
        },
        {
            title: 'Student',
            img: '/Student.png'
        },
        {
            title: 'Others',
            img: '/Others.png'
        }
    ]
    return (
        <>

            <div className='
    grid 
    lg:grid-cols-4
    md:grid-cols-3
    sm:grid-cols-2
    grid-cols-1 
    gap-10 
    mt-10
    
    '>
                {
                    goals.map((goal, index) => (
                        <SingleGoal
                            selected={selected}
                            setSelected={setSelected}
                            key={index}
                            goal={goal} />
                    ))
                }
            </div>

            <div className='mt-auto flex justify-between'>
                <LinkComp
                    className='w-40 bg-gray-400 hover:bg-gray-300'
                    href={'/builder/personal'}>
                    Back
                </LinkComp>
                <LinkComp
                    disabled={selected === '' ? true : false}
                    href={'/builder/skills'}
                >
                    Next
                </LinkComp>
            </div >
        </>
    )
}

export default Goals