'use client'
import SuggestedSummary from './SuggestedSummary'
import RichTextEditor from '@/components/commons/RichTextEditor'

const MainSummary = () => {

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
                value='1'
                onChange={ () => {}}
            />
        </div>
    )
}

export default MainSummary