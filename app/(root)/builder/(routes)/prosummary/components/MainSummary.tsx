import dynamic from 'next/dynamic'
import Editor from './Editor'
import BioSkeleton from './BioSkeleton'
const SuggestedSummary = dynamic(() => import('./SuggestedSummary'),{
    loading : () => <BioSkeleton/>
})

const MainSummary = ({

}) => {

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
            <Editor/>
        </div>
    )
}

export default MainSummary