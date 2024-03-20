import PersonalForm from './components/PersonalForm'
import TextSection from './components/TextSection'

const BuilderPage = () => {
    return (
        <div className='flex gap-5 h-calc(100vh-8.25rem) w-full py-10 px-20'>
            <TextSection />
            <PersonalForm />
        </div>
    )
}

export default BuilderPage