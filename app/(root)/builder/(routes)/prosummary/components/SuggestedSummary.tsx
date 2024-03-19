'use client'
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks"
import { setSelectedBio } from "@/redux/slice/userSlice";
import BioSkeleton from "./BioSkeleton"
import Circle from "@/components/commons/Circle";
import { Plus } from "lucide-react";


const SuggestedSummary = () => {

    const dispatch = useAppDispatch();
    const aiSuggestedBio = useAppSelector(state => state.persistedReducer.aiSuggestedBio);


    return (
        <div className='flex flex-col gap-3 p-5'>
            <h1 className='font-semibold'>
                Select Career Field
            </h1>
            <ol className='
                list-none 
                text-sm 
                text-neutral-500 
                space-y-5 
                mt-2
                
                '>
                {
                    aiSuggestedBio.length > 0 ? aiSuggestedBio.map((bio: string, index: number) => (
                        <li
                            key={index}

                            className="
                                min-h-20
                                relative
                                bg-white
                                text-neutral-500
                                p-4
                                rounded-sm
                                "
                        >
                            {bio}
                            <Circle
                                onClick={() => dispatch(setSelectedBio(bio))}
                                className="
                                cursor-pointer
                                absolute
                                right-[-20px]
                                top-[29%]
                                "
                            >
                                <Plus />
                            </Circle>
                        </li>
                    ))
                        :
                        <BioSkeleton />
                }
            </ol>
        </div>
    )
}

export default SuggestedSummary