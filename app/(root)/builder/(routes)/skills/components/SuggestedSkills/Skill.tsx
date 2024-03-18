import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { setTechnicalSkills } from '@/redux/slice/userSlice';
import React, { useEffect, useState } from 'react'

interface SkillProps {
    skill: string,

}

const Skill: React.FC<SkillProps> = ({
    skill,
}) => {

    const [isMounted, setIsMounted] = useState(false);
    const dispatch = useAppDispatch();
    const skillsFromState: string[] = useAppSelector(state => state.persistedReducer.technicalSkills?.aiGenSkills) || [];

    const handleSelect = () => {

        const alreadySelected = skillsFromState.find((item) => item === skill);
        if (alreadySelected) {
            const filtered = skillsFromState.filter(item => item !== skill);
            dispatch(setTechnicalSkills({ aiGenSkills: filtered }));
        }
        else {
            dispatch(setTechnicalSkills({ aiGenSkills: [...skillsFromState, skill] }));
        }
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <div
                onClick={handleSelect}
                className={
                    `py-5
                        px-3
                        h-12
                        w-full
                        flex 
                        items-center
                         bg-white
                          rounded-sm
                          shadow-md
                           cursor-pointer
                            ${skillsFromState.length > 0 && skillsFromState.includes(skill) ?
                        'border-4 border-red-400 transition scale-90' : ''} 
                            `}
            >
                <h1 className='text-sm text-neutral-500'>
                    {skill}
                </h1>
            </div>

        </>
    )
}

export default Skill