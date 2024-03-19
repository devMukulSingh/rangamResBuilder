import Circle from '@/components/commons/Circle'

const TextSection = () => {
    return (
        <div className='w-1/2 flex flex-col gap-8'>

            <div className='flex gap-5'>
                <Circle>
                    1
                </Circle>
                <h1 className='text-4xl font-bold'>
                    Let's get started!
                </h1>
            </div>
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