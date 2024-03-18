'use client'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { Button } from '@/components/ui/button';
import { templatesUrl } from '@/lib/constants';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
const Template = dynamic(() => import('./components/Template'))
import axios from "axios";
import { setAiSuggestedBio, setAiSuggestedSkills } from "@/redux/slice/userSlice";
import { setBioLoading, setSkillsLoading } from '@/redux/slice/commonSlice';
import Link from 'next/link';


const TemplatesPage = () => {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const [templateId, setTemplateId] = useState("");
    const profession = useAppSelector(state => state.persistedReducer.personalInfo.profession);

    const handleTemplateSelect = async () => {
        router.push(`/builder/${templateId}?profession=${profession}`);
        try {
            setBioLoading(true);
            const { data: res } = await axios.get(`/api/ai/get-bio`, {
                params: {
                    profession: profession
                }
            });
            const parsedBio = res.replace(/\d+(\.\s*|\.)?/g, '').split('\n').filter((item: string) => item !== '');
            dispatch(setAiSuggestedBio(parsedBio));
        }
        catch (e) {
            console.log(`Error in onSubmit ${e}`);
        }
        finally {
            setBioLoading(false);
        }

        try {
            setSkillsLoading(true);
            const { data: res } = await axios.get(`/api/ai/get-skills`, {
                params: {
                    profession: profession
                }
            });
            const parsedSkills = res?.replace(/\d+(\.\s*|\.)?/g, '').split('\n').filter((item: string) => item !== '');
            dispatch(setAiSuggestedSkills(parsedSkills));

        }
        catch (e) {
            console.log(`Error in onSubmit ${e}`);
        }
        finally {
            setSkillsLoading(false);
        }
    }
    return (
        <main className=' flex flex-col h-[calc(100vh-6rem)] px-10 py-5'>
            <Link href={'/'} className='w-fit' >
                <BiArrowBack
                    className='text-xl size-10 cursor-pointer' />
            </Link>
            <section className='flex items-center flex-col gap-10 h-full'>
                <h1
                    className='text-xl slef-start sm:text-3xl font-bold whitespace-nowrap'>
                    Select your Template
                </h1>
                <div className='sm:flex-row flex flex-col gap-10'>
                    {
                        templatesUrl.map(image => (
                            <Template
                                templateId={templateId}
                                key={image.id}
                                image={image}
                                setTemplateId={setTemplateId}
                            />
                        ))
                    }
                </div>
                <Button
                    disabled={templateId === '' ? true : false}
                    onClick={handleTemplateSelect}
                    className='w-60 rounded-sm mt-auto'>
                    Select
                </Button>
            </section>
        </main>
    )
}

export default TemplatesPage