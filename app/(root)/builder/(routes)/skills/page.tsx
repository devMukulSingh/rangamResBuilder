import Skills from './components/Skills'
import Circle from '@/components/commons/Circle'
import { ChatGPT } from '@/lib/ChatGPT'
import { cookies } from 'next/headers'
import LinkComp from '@/components/ui/LinkComp'

const SkillsPage = async () => {

    const profession = cookies().get('profession')?.value || 'Frontend dev';

    const skillPrompt = `My profession is ${profession}, give me a list of 13 technology names, or skills relevant to this profession in max 3 words`;
    // const skillPrompt = `List 13 skills relevant to the profession of ${profession} and do not show any tools only show relevant skills that i can showcase on resume`
    const skills = await ChatGPT(skillPrompt);

    const parsedSkills = skills?.replace(/\d+(\.\s*|\.)?/g, '').split('\n').filter((item: string) => item !== '') || [];
    console.log(parsedSkills);

    //     const parsedSkills = [
    //   'Agile methodology',
    //   'Scrum master',
    //   'Gantt charts',
    //   'Risk assessment',
    //   'Stakeholder management',
    //   'Waterfall approach',
    //   'Critical path analysis',
    //   'Budget tracking',
    //   'Communication software',
    //   'Resource allocation',
    //   'Change management',
    //   'Project scheduling',
    //   'Collaboration tools'
    // ]

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
                    <LinkComp
                        className='w-40  bg-gray-400 hover:bg-gray-300'
                        href={'/builder/goals'}>
                        Back
                    </LinkComp>
                    <LinkComp
                        className='w-40'
                        href={'/builder/experience'}>
                        Next
                    </LinkComp>
                </div>
            </div >
        </>

    )

}

export default SkillsPage