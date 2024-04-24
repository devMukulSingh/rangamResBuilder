import React from 'react'
import { LuLoader2 } from 'react-icons/lu'

const loading = () => {
  return (
    <div className='w-[100vw] flex mt-20 justify-center'>
        <LuLoader2 className='animate-spin' size={35}/>
    </div>
  )
}

export default loading