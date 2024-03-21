'use client'
import { useAppSelector } from "@/redux/hooks/hooks"
import SelectComp from "./SelectComp";
import dynamic from "next/dynamic";
import BioSkeleton from "./BioSkeleton";
const SummaryPoint =  dynamic( () => import ("./SummaryPoint") , {
    loading: () => <BioSkeleton/>
});

const SuggestedSummary = () => {

    const aiSuggestedBio = useAppSelector(state => state.persistedReducer.aiSuggestedBio);

    return (
        <div className='flex flex-col gap-3 p-5'>

            <h1 className='font-semibold'>
                Select Career Field
            </h1>

            <SelectComp />

            <ol className='
                list-none 
                text-sm 
                text-neutral-500 
                space-y-5 
                mt-2
                
                '>
                {
                    aiSuggestedBio.map((bio: string, index: number) => (
                        <SummaryPoint bio={bio} key={index} />
              
                    ))

                }
            </ol>
        </div>
    )
}

export default SuggestedSummary