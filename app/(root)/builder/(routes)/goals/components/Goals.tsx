'use client'
import React, { useState } from 'react'
import SingleGoal from './SingleGoal'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/redux/hooks/hooks'

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
                <Link href={'/builder/personal'}>
                    <Button className='w-40 bg-gray-400 hover:bg-gray-300'>
                        Back
                    </Button>
                </Link>
                <Button
                    onClick={() => router.push(`/builder/skills`)}
                    className='w-40'
                    disabled={selected === '' ? true : false}
                >
                    Next
                </Button>
            </div>
        </>
    )
}

export default Goals