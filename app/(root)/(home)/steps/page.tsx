import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import Steps from './components/Steps'

const StepsPage = () => {
    return (
        <div className='flex gap-10 px-20 py-10 h-[calc(100vh-8.25rem)]'>

            <div className='flex flex-col gap-8 w-2/3 '>

                <h1 className='text-4xl font-bold'>
                    3 steps to create a resume
                </h1>

               <Steps/>
               
                <Link
                    className='ml-auto w-60 h-10'
                    href={'/builder'}>
                    <Button className='w-full' >
                        Create a RESUME
                    </Button>
                </Link>

            </div>

            <figure
                className='relative w-[30rem] h-[30rem] self-end'>
                <Image
                    fill
                    alt='resumeImg'
                    src={'./next.svg'} />
            </figure>
        </div>
    )
}

export default StepsPage