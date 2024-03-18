import { Button } from '@/components/ui/button'
import Link from 'next/link'
import SkillsList from './components/SkillsList'

const SkillsPage = () => {

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
                3/6 Skills
            </h1>
            <h1 className='text-xl text-neutral-600'>
                We found recommended skills for you. Let's find relevant skills for the job you are applying for. <br />
                Listing 6-10 skills is best.
            </h1>
            
            <SkillsList/>

            <div className='mt-auto flex justify-between'>
                <Link href={'/builder/goals'}>
                    <Button className='w-40'>
                        Back
                    </Button>
                </Link>
                <Link href={'/builder/experience'}>
                    <Button className='w-40'>
                        Next
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default SkillsPage