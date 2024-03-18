import React from 'react'
import SuggestedSkils from './SuggestedSkills/SuggestedSkills'
import SelectedSkills from './SelectedSkills/SelectedSkills'

const SkillsList = () => {
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

      <SuggestedSkils />
      <SelectedSkills />
    </div>
  )
}

export default SkillsList