import {  useAppSelector } from '@/redux/hooks/hooks';

interface competenceProps {
    competence: string,
    onChange : (competences:string[]) => void,
    index:number,
}

const Competence: React.FC<competenceProps> = ({
    competence,
    onChange,
    index
}) => {
    
    const competencesFromState:string[] = useAppSelector( state => state.persistedReducer.experience?.[index].competences) || [];
    
    const handleSelect = () => {
        
        const alreadySelected = competencesFromState.find((item) => item === competence);
        if (alreadySelected) {
            const filtered = competencesFromState.filter(item => item !== competence);
            onChange(filtered)
        }
        else {
            onChange([...competencesFromState,competence]);
        }
    };

    if(competence ==='') return null;

    return (
        <>
            <div
                onClick={handleSelect}
                className={
                    `py-5
                        transition
                        px-3
                        h-12
                        w-full
                        flex 
                        items-center
                         bg-white
                          rounded-sm
                          shadow-md
                           cursor-pointer
                            ${competencesFromState.length > 0 && competencesFromState.includes(competence) ?
                        'border-4 border-red-400 transition scale-90' : ''} 
                            `}
            >
                <h1 className='text-sm text-neutral-500'>
                    {competence}
                </h1>
            </div>

        </>
    )
}

export default Competence