import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks"
import { setSelectedBio } from "@/redux/slice/userSlice";
import BioSkeleton from "../../../../builder/(routes)/prosummary/components/BioSkeleton";


const SuggestedBio = () => {

    const dispatch = useAppDispatch();
    const aiSuggestedBio = useAppSelector(state => state.persistedReducer.aiSuggestedBio);


    return (
        <div className='flex flex-col gap-3 bg-white p-5'>
            <h1 className='text-xl font-semibold'>AI Suggested BIO</h1>
            <h1 className="text-sm">Select and edit</h1>
            <ol className='list-decimal pl-5 text-sm text-neutral-500 space-y-2 mt-2'>
                {
                    aiSuggestedBio.length > 0 ? aiSuggestedBio.map((bio: string, index: number) => (
                        <li
                            key={index}
                            onClick={() => dispatch(setSelectedBio(bio))}
                            className="cursor-pointer"
                        >
                            {bio}
                        </li>
                    ))
                        :
                        <BioSkeleton />
                }
            </ol>
        </div>
    )
}

export default SuggestedBio