'use client'
import { useAppSelector } from '@/redux/hooks/hooks'
import Skill from './Skill'

const SelectedSkills = () => {

  const selectedSkills = useAppSelector( state => state.persistedReducer.technicalSkills.aiGenSkills)
  const customSkills = useAppSelector( state => state.persistedReducer.technicalSkills.customSkills)
                        .map(item => item.skillName);

  const combinedSkills = [...selectedSkills,...customSkills];
  
  return (
    <div className='flex flex-col gap-5'>
        <h1 className='
          text-neutral-600 
          font-semibold
          text-lg
          '>
          Selected Skills
        </h1>
        <div className='grid grid-cols-3 gap-5'>
          {
            combinedSkills?.map( (skill:string,index:number) => (
              <Skill 
                key={index} 
                skill={skill}
                selectedSkills={selectedSkills}
                />
            ))
          }

        </div>
    </div>
  )
}

export default SelectedSkills