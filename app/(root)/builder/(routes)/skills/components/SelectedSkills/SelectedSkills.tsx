import Skill from './Skill'

const SelectedSkills = () => {
  const selectedSkills = [
    "HTML", "React", "NEXT", "Express", "ShadcnUI", "Tailwind",
    "HTML", "React", "NEXT", "Express",
]
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
            selectedSkills.map( (skill,index) => (
              <Skill key={index} skill={skill}/>
            ))
          }
        </div>
    </div>
  )
}

export default SelectedSkills