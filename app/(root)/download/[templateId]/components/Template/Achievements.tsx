import { useAppSelector } from '@/redux/hooks/hooks';
import React from 'react'

const Achievements = () => {
    const achievements = useAppSelector(state => state.persistedReducer.achievements);

    
  return (
    <div>Achievements</div>
  )
}

export default Achievements