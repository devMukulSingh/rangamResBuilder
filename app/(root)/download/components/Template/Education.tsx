'use client'
import { useAppSelector } from '@/redux/hooks/hooks';
import { format } from 'date-fns';
import React from 'react'

const Education = () => {
    const education = useAppSelector(state => state.persistedReducer.education);
    // console.log(education);

    return (
        <section className='space-y-2'>
            <div className='flex items-center gap-5'>
                <hr className='h-2 border-none bg-blue-400 w-14' />
                <h1 className=' font-bold'>
                    EDUCATION
                </h1>
            </div>

            {
                education?.map((item, index) => (

                    <div key={index}>
                        <h1 className='font-bold'>
                            {item?.schoolName}
                        </h1>
                        <div className='flex justify-between'>
                            <h1>
                                {` ${item.degree ? `${item?.degree} in ${item.speciality}` : ''} `}
                            </h1>
                            <h1>
                                {`${item.startDate ? format(item?.startDate, "MMM yyyy") : ''}`}
                                {`${item?.endDate ? ` - ${format(item.endDate, "MMM yyyy")}` : ' - present'}`}
                            </h1>
                        </div>

                    </div>
                ))
            }
        </section>
    )
}

export default Education