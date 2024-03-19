import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import SingleGoal from './components/SingleGoal'
import Circle from '@/components/commons/Circle'

const GoalsPage = () => {
    const goals = [
        {
            title: 'Fulltime',
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
        <div
            className='
        flex 
        flex-col 
        gap-5 
        border
        h-[calc(100vh-6rem)]
        px-20
        py-10
        w-full
        '>
            <div className='flex gap-5'>
                <Circle>
                    2
                </Circle>
                <h1
                    className='
                text-4xl
                font-bold
                '>
                    Tailor your resume to your career goals
                </h1>
            </div>
            <h1 className='text-xl text-neutral-600'>
                Select your employment and help us make &nbsp;
                <span className='font-bold'>
                    the most relevant resume
                </span>
                &nbsp;
                for you
            </h1>

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
                        <SingleGoal key={index} goal={goal} />
                    ))
                }
            </div>

            <div className='mt-auto flex justify-between'>
                <Link href={'/builder/personal'}>
                    <Button className='w-40'>
                        Back
                    </Button>
                </Link>
                <Link href={'/builder/skills'}>
                    <Button className='w-40'>
                        Next
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default GoalsPage