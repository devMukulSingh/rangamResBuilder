import { useAppSelector } from '@/redux/hooks/hooks';

const Languages = () => {
    const languages = useAppSelector(state => state.persistedReducer.languages);

  return (
    <div>Languages</div>
  )
}

export default Languages