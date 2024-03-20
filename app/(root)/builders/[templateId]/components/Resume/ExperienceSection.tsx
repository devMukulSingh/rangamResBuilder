// 'use client'
// import React from 'react'
// import { HTMLRenderer } from '@/lib/HTMLRenderer';
// import { useAppSelector } from '@/redux/hooks/hooks';

// interface ExperienceSectionProps {

// }

// const ExperienceSection: React.FC<ExperienceSectionProps> = ({

// }) => {

//     const experience = useAppSelector(state => state.persistedReducer.experience);

//     return (
//         <div className='space-y-4 bg-white p-5 '>
//             <h1 className=' text-xl font-semibold'>
//                 Work Experience
//             </h1>
//             {
//                 experience?.map((item, index) => (
//                     <div className='flex flex-col gap-5 break-all' key={index}>
//                         <div>
//                             <h1 className='font-bold'>
//                                 {/* {item.role || ''}  {` ${item.address ? `| ${item.address}` : ''} `} */}
//                             </h1>
//                             <h1>
//                                 {/* {format(item.startDate, "MMM dd")}-{format(item.endDate, "MMM dd")} */}
//                             </h1>
//                         </div>
//                         {/* <HTMLRenderer htmlString={item.description} /> */}

//                     </div>
//                 )
//                 )
//             }
//         </div>
//     )
// }

// export default ExperienceSection