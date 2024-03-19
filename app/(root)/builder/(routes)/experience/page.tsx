import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ExperienceForm from '@/app/(root)/builder/(routes)/experience/components/ExperienceForm'
import Circle from '@/components/commons/Circle'
import { cookies } from 'next/headers'

const ExperiencePage = () => {


    return (
        <div
            className='
        flex 
        flex-col
        gap-5 
        border
        min-h-[calc(100vh-6rem)]
        px-20
        py-10
        w-full
        '>
            <div className='flex gap-5'>
                <Circle>
                    4
                </Circle>
                <h1
                    className='
                text-4xl
                font-bold
                '>
                    Experience
                </h1>
            </div>
            <h1 className='text-xl text-neutral-600'>
                Your experience tells a story of your career progression. Share the details and let's capture the essence of your expertise together.
            </h1>

            <ExperienceForm/>

            <div className='mt-auto flex justify-between'>
                <Link href={`/builder/skills`}>
                    <Button className='w-40'>
                        Back
                    </Button>
                </Link>
                <Link href={`/builder/prosummary`}>
                    <Button className='w-40'>
                        Next
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default ExperiencePage