'use client'
import React, { FC, useEffect } from 'react'
import SuggestedSkils from './SuggestedSkills/SuggestedSkills'
import SelectedSkills from './SelectedSkills/SelectedSkills'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks'
import { setAiSuggestedSkills } from '@/redux/slice/userSlice'

export interface SkillsProps{
  skills:string[] | null,
}

const Skills:FC<SkillsProps> = ({
  skills
}) => {
  
  const dispatch = useAppDispatch();
    useEffect( () => {
      dispatch(setAiSuggestedSkills(skills));
    },[]);

  return (
    <div
      className='
        w-full 
        bg-red-100
        rounded-md
        grid
        grid-cols-2
        gap-10
        py-5
        px-10
        h-[25rem]
        '>
          
      <SuggestedSkils/>
      <SelectedSkills />
    </div>
  )
}

export default Skills