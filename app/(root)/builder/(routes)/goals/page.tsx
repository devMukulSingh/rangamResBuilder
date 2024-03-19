
import React from 'react'
import Circle from '@/components/commons/Circle'
import Goals from './components/Goals'

const GoalsPage = () => {

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
            <header className='flex flex-col gap-5'>
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
            </header>

            <Goals />


        </div>
    )
}

export default GoalsPage