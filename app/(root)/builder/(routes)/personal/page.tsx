import PersonalForm from './components/PersonalForm'
import TextSection from './components/TextSection'

const BuilderPage = () => {
    return (
        <div className='md:flex-row flex flex-col gap-10 w-full py-10 sm:px-20 px-10'>
            <TextSection />
            <PersonalForm />
        </div>
    )
}

export default BuilderPage