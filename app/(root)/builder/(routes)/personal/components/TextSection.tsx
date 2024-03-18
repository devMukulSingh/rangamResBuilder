import React from 'react'

const TextSection = () => {
  return (
    <div className='w-1/2 flex flex-col gap-8'>
        <h1 className='text-4xl font-bold'>
            1/6 Let's get started!
        </h1>
        <h1 className='text-lg font-semibold text-neutral-600'>
            Complete your resume heading
        </h1>
        <h1 className='text-lg font-semibold text-neutral-600'>
            Your resume is a reflection of your <br />
            professional identity. <br />
            <span className=' font-bold'>
                Let's make sure it shines
            </span>
        </h1>
    </div>
  )
}

export default TextSection