// import { useAppSelector } from '@/redux/hooks/hooks';
// import React from 'react'

// interface LanguageSectionProps {

// }

// const LanguageSection: React.FC<LanguageSectionProps> = ({

// }) => {
//     const languages = useAppSelector(state => state.persistedReducer.languages);
//     return (
//         <section className='space-y-5  bg-white p-5'>
//             <h1 className=' text-xl font-semibold'>
//                 Languages
//             </h1>
//             <ul className='list-disc pl-5'>
//                 {
//                     languages?.map((language, index) => {
//                         if(language.language==='') return null;
//                         return (
//                             <li key={index}>
//                                 {(`${language?.language} - ${language?.strength}`) || ''}
//                             </li>
//                         )

//                     }
//                     )
//                 }
//             </ul>
//         </section>
//     )
// }

// export default LanguageSection