// 'use client'
// import { HTMLRenderer } from "@/lib/HTMLRenderer";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
// import { setSelectedBio } from "@/redux/slice/userSlice";
// import 'react-quill/dist/quill.snow.css';
// import dynamic from "next/dynamic";
// const RichTextEditor = dynamic(() => import('@/components/commons/RichTextEditor'), {
//     ssr: false
// })

// interface PersonalSection {

// }

// const PersonalSection: React.FC<PersonalSection> = ({

// }) => {
//     const dispatch = useAppDispatch();
//     const personalInfo = useAppSelector(state => state.persistedReducer.personalInfo);
//     const formComp = useAppSelector(state => state.commonSlice.formComp);
//     const selectedBio = useAppSelector(state => state.persistedReducer?.personalInfo?.bio);


//     return (
//         <div className="bg-white px-8 pt-10 pb-5 flex flex-col gap-5 h-fit">
//             {/* ABOUT */}
//             <div className='space-y-2'>
//                 <h1 className='text-2xl font-semibold'>
//                     {personalInfo?.fullName}
//                 </h1>
//                 <h1>
//                     {personalInfo?.mobile}  {`${personalInfo?.email ? `|| ${personalInfo.email}` : ''}`}
//                 </h1>
//             </div>

//             <div className='space-y-2'>

//                 <h1 className='text-xl font-semibold'>
//                     Address
//                 </h1>
//                 <h1 className="text-neutral-500">
//                     {personalInfo?.address}
//                 </h1>

//             </div>

//             {/* BIO */}
//             <div className='space-y-2'>
//                 <h1 className='text-xl font-semibold'>
//                     Bio
//                 </h1>
//                 {
//                    formComp === 'Personal Information' ?
//                         <RichTextEditor
//                             value={selectedBio}
//                             onChange={(content) => dispatch(setSelectedBio(content))}
//                         /> :
//                         <h1 className="text-neutral-500">
//                             <HTMLRenderer htmlString={selectedBio || ''} />
//                         </h1>
//                 }
//             </div>

//         </div>
//     )
// }

// export default PersonalSection