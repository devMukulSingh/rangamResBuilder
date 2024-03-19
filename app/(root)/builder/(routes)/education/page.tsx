import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Circle from '@/components/commons/Circle'


const EducationPage = () => {
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
            <header className='flex flex-col gap-5'>
                <div className='flex gap-5'>
                    <Circle>
                        6
                    </Circle>
                    <h1
                        className='
            text-4xl
            font-bold
            '>
                        Education
                    </h1>
                </div>
                <h1 className='text-xl text-neutral-600'>
                    Write a short summary telling more about yourself, your strengths <br />
                    and experience or select our generated personalized summary for you.
                </h1>
            </header>
            

            <div className='mt-auto flex justify-between'>
                <Link href={'/builder/experience'}>
                    <Button className='w-40'>
                        Back
                    </Button>
                </Link>
                <Link href={'/builder/education'}>
                    <Button className='w-40'>
                        Next
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default EducationPage