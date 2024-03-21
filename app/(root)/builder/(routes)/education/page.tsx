
import Circle from '@/components/commons/Circle'
import EducationForm from './components/EducationForm'
import LinkComp from '@/components/ui/LinkComp'


const EducationPage = () => {
    return (
        <div
            className='
flex 
flex-col
gap-5 
border
min-h-[calc(100vh-6rem)]
px-20
py-10
w-full
'>
            <header className='flex flex-col gap-5'>
                <div className='flex gap-5'>
                    <Circle>
                        6
                    </Circle>
                    <h1
                        className='
            text-4xl
            font-bold
            '>
                        Education
                    </h1>
                </div>
                <h1 className='text-xl text-neutral-600'>
                    Please enter your university/school name.
                </h1>
            </header>

            <EducationForm />


        </div>
    )
}

export default EducationPage