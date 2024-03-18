import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import SingleGoal from './components/SingleGoal'

const GoalsPage = () => {
    const goals = [
        {
            title: 'Fulltime',
            img: ''
        },
        {
            title: 'Young Professional',
            img: ''
        },
        {
            title: 'Student',
            img: ''
        },
        {
            title: 'Others',
            img: ''
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
            <h1
                className='
                    text-4xl
                    font-bold
                '>
                2/6 Tailor your resume to your career goals
            </h1>
            <h1 className='text-xl text-neutral-600'>
                Select your employment and help us make &nbsp;
                <span className='font-bold'>
                    the most relevant resume
                </span>
                &nbsp;
                for you
            </h1>

            <div className='grid grid-cols-4 gap-10 mt-10'>
                {
                    goals.map((goal,index) => (
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