import { Trash, Trash2 } from 'lucide-react'
import React from 'react'

interface SkillProps {
    skill: string
}

const Skill: React.FC<SkillProps> = ({
    skill
}) => {
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
                className='
                cursor-pointer
                text-red-500
                '
            />
        </div>
    )
}

export default Skill