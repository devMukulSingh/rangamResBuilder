import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import React, { useEffect, useState } from 'react'

interface SkillProps {
    skill: string,
    onChange : (skills:string[]) => void,
    index:number,
    handleChange : () => void
}

const Skill: React.FC<SkillProps> = ({
    skill,
    onChange,
    handleChange,
    index
}) => {
    
    if(skill ==='') return null;
    const skillsFromState:string[] = useAppSelector( state => state.persistedReducer.experience?.[index]?.selectedSkills) || [];
    
    const handleSelect = () => {
        
        const alreadySelected = skillsFromState.find((item) => item === skill);
        if (alreadySelected) {
            const filtered = skillsFromState.filter(item => item !== skill);
            onChange(filtered)
            handleChange();
        }
        else {
            onChange([...skillsFromState,skill]);
            handleChange();
            
        }
    };


    return (
        <>
            <div
                onClick={handleSelect}
                className={
                    `py-5
                        transition
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