'use client'
import { FC, Suspense, useEffect } from 'react'
import { setAiSuggestedBio, setSelectedBio } from '@/redux/slice/userSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks'
import dynamic from 'next/dynamic'
import BioSkeleton from './BioSkeleton'
import SuggestedSummary from './SuggestedSummary'
const RichTextEditor = dynamic(() => import('@/components/commons/RichTextEditor'), {
    ssr: false,
    loading: () => <BioSkeleton />
})


interface MainSummaryProps {
    parsedBio: string[]
}

const MainSummary: FC<MainSummaryProps> = ({
    parsedBio
}) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setAiSuggestedBio(parsedBio));
    }, []);

    const selectedBio = useAppSelector(state => state.persistedReducer.personalInfo.bio);
    
    return (
        <div className='
             gap-10 
            bg-red-100
             rounded-lg 
             py-10 px-10
             text-neutral-500
             grid
             grid-cols-2
             '>
            <SuggestedSummary />
            <RichTextEditor
                value={selectedBio}
                onChange={(content) => dispatch(setSelectedBio(content))}
            />
        </div>
    )
}

export default MainSummary