'use client'

import { useAppSelector } from '@/redux/hooks/hooks';

const Skills = () => {
    const skills = useAppSelector(state => state.persistedReducer.technicalSkills);


    return (
        <section className='space-y-1'>
            <div className='flex items-center gap-5'>
                <hr className='h-2 bg-blue-400 w-14' />
                <h1 className=' font-bold'>
                    SKILLS
                </h1>
            </div>
            <ul className='list-disc pl-8'>
                {/* <li className='whitespace-normal'>
                    Tech: {
                        skills.aiGenSkills.map(item => item).join(', ')
                    },
                    {
                        skills.customSkills.map(item => item.skillName).join(', ')
                    }
                </li> */}

            </ul>
        </section>

    )
}

export default Skills