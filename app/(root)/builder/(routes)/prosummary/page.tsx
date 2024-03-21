import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Circle from '@/components/commons/Circle'
import MainSummary from './components/MainSummary'
import { cookies } from 'next/headers'
import { ChatGPT } from '@/lib/ChatGPT'
import LinkComp from '@/components/ui/LinkComp'

const ProSummaryPage = async () => {
    const profession = cookies().get('profession')?.value || 'Frontend dev';

    const bioPrompt = `Suggest 3 short bio for ${profession} for resume`;
    const bio = await ChatGPT(bioPrompt);
    const parsedBio = bio?.replace(/\d+(\.\s*|\.)?/g, '').split('\n').filter((item: string) => item !== '') || [];

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
                        5
                    </Circle>
                    <h1
                        className='
                    text-4xl
                    font-bold
                    '>
                        Professional Summary
                    </h1>
                </div>
                <h1 className='text-xl text-neutral-600'>
                    Write a short summary telling more about yourself, your strengths <br />
                    and experience or select our generated personalized summary for you.
                </h1>
            </header>

            <MainSummary parsedBio={parsedBio} />

            <div className='mt-auto flex justify-between'>
                <LinkComp
                    className='w-40  bg-gray-400 hover:bg-gray-300'
                    href={'/builder/experience'}>
                    Back
                </LinkComp>
                <LinkComp
                    className='w-40'
                    href={'/builder/education'}>
                    Next
                </LinkComp>
            </div>
        </div>
    )
}

export default ProSummaryPage