import Link from 'next/link'
import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import DownloadButtons from './DownloadButtons'

interface DownloadSectionProps {
    templateId: string
}

const DownloadSection: React.FC<DownloadSectionProps> = ({
    templateId
}) => {

    return (
        <main className='flex flex-col gap-10 md:gap-20 w-full md:w-1/2  h-fit  md:h-[calc(100vh-8.5rem)] '>
            <Link href={`/builder/education`}>
                <BiArrowBack
                    className='cursor-pointer'
                    size={30} />
            </Link>
            <section className='flex flex-col gap-5 lg:px-32 md:px-20 px-5 h-full'>
                <h1 className='text-4xl font-bold'>Contratulations!</h1>
                <h1 className='text-xl text-neutral-600'>Your resume is ready for download.</h1>
                <DownloadButtons />
            </section>
        </main>
    )
}

export default DownloadSection