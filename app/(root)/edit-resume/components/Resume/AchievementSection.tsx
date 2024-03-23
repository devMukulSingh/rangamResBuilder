import { useAppSelector } from "@/redux/hooks/hooks";

interface AchievementsSectionProps {

}

const AchievementSection: React.FC<AchievementsSectionProps> = ({

}) => {
    const achievements = useAppSelector(state => state.persistedReducer.achievements);
    return (
        <section className='space-y-5  bg-white p-5'>
            <h1 className=' text-xl font-semibold'>
                Achievements
            </h1>
            <ul className='list-disc pl-5'>
                {
                    achievements?.map((achievement, index) => {
                        if(achievement.value==='') return null;
                        return(
                        <li key={index}>
                            {achievement.value}
                        </li>
                    )
                        }
                        )
                }
            </ul>
        </section>
    )
}

export default AchievementSection