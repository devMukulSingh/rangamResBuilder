import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ExperienceForm from '@/app/(root)/builder/(routes)/experience/components/ExperienceForm'
import Circle from '@/components/commons/Circle'
import { cookies } from 'next/headers'
import { ChatGPT } from '@/lib/ChatGPT'

const ExperiencePage = async () => {

    const profession = cookies().get('profession')?.value || 'Frontend dev';

    const prompt = `Generate 7 key competences or responsibilities whose profession is ${profession},in max 3 words`;
    
    const competences = await ChatGPT(prompt);
    const parsedCompetences = competences?.replace(/\d+(\.\s*|\.)?/g, '').split('\n').filter((item: string) => item !== '') || [];
    // console.log(parsedCompetences);

    // const parsedCompetences = [
    //     'Data analysis',
    //     'Machine learning',
    //     'Statistical modeling',
    //     'Data visualization',
    //     'Predictive analytics',
    //     'Data mining',
    //     'Big data management'
    // ]

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

            <ExperienceForm parsedCompetences={parsedCompetences} />


        </div>
    )
}

export default ExperiencePage