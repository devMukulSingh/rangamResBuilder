import { useAppDispatch } from '@/redux/hooks/hooks'
import { setTechnicalSkills } from '@/redux/slice/userSlice'
import { Trash, Trash2 } from 'lucide-react'
import React from 'react'

interface SkillProps {
    skill: string,
    selectedSkills:string[]
}

const Skill: React.FC<SkillProps> = ({
    skill,
    selectedSkills
}) => {
    const dispatch = useAppDispatch();
    const handleRemoveSkill = () => {
        const filteredSkills = selectedSkills.filter( ( item) => item!== skill)
        dispatch(setTechnicalSkills(filteredSkills))
    }
    if(skill ==='') return null;
    return (
        <div
            className='
            bg-white
            flex
            rounded-md
            justify-between
            py-3
            px-4
         '>
            <h1>
                {skill}
            </h1>
            <Trash2
                onClick={ handleRemoveSkill }
                className='
                cursor-pointer
                text-red-500
                '
            />
        </div>
    )
}

export default Skill