import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Skills from './components/Skills'
import Circle from '@/components/commons/Circle'
import { ChatGPT } from '@/lib/ChatGPT'
import { cookies } from 'next/headers'

const SkillsPage = async () => {

    const  profession  = cookies().get('profession')?.value || 'Frontend dev';

    const skillPrompt = `My profession is ${profession}, give me a list of 13 technology names used in this profession`;

    const skills = await ChatGPT(skillPrompt);

    const parsedSkills = skills?.replace(/\d+(\.\s*|\.)?/g, '').split('\n').filter((item: string) => item !== '') || [];

    return (
        <>
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
                            3
                        </Circle>
                        <h1
                            className='
                text-4xl
                font-bold
                '>
                            Skills
                        </h1>
                    </div>

                    <h1 className='text-xl text-neutral-600'>
                        We found recommended skills for you. Let's find relevant skills for the job you are applying for. <br />
                        Listing 6-10 skills is best.
                    </h1>
                </header>

                <Skills skills={parsedSkills} />

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
            </div >
        </>

    )

}

export default SkillsPage