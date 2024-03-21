'use client'
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setEducation } from "@/redux/slice/userSlice";
import { useEffect, useState } from "react";
import { Ieducation } from "@/lib/types";
import { FieldValues, useFieldArray, useForm, UseFormReturn } from "react-hook-form"
import { motion } from "framer-motion"
import { Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import SchoolName from "./formFields/SchoolName";
import Speciality from "./formFields/Speciality";
import StartDate from "./formFields/StartDate";
import EndDate from "./formFields/EndDate";
import Degree from "./formFields/Degree";
import CheckboxPursuing from "./formFields/CheckboxPursuing";
import LinkComp from "@/components/ui/LinkComp";
import { useRouter } from "next/navigation";


export interface IeducationForm {
    form: UseFormReturn<{
        education: Ieducation[];
    }, any, undefined>,
    index: number
}

const EducationForm = () => {

    const [selected, setSelected] = useState<string>("");
    const dispatch = useAppDispatch();
    const education = useAppSelector(state => state.persistedReducer.education);
    const router = useRouter()

    const form = useForm({
        defaultValues: {
            education: education || [
                {
                    schoolName: '',
                    degree: '',
                    speciality: '',
                    startDate: '',
                    endDate: '',
                    id: Math.floor(Math.random() * 100).toString(),
                    checkboxPursuing: false

                },
            ]
        }
    });

    const fieldArray = useFieldArray({
        name: 'education',
        control: form.control
    })
    const watchFieldsArray = form.watch('education');

    const controlledFields = fieldArray.fields.map((field, index) => {
        return {
            ...field,
            ...watchFieldsArray[index]
        }
    })

    // const handleChange = () => {
    //     const education = form.getValues().education;
    //     const parsedEducation = education.map((item) => {
    //         return {
    //             schoolName: item.schoolName,
    //             degree: item.degree,
    //             speciality: item.speciality,
    //             startDate: item.startDate,
    //             endDate: item.endDate,
    //             id: item.id,
    //         }
    //     })

    //     dispatch(setEducation(parsedEducation));

    // }
    const handleAddMore = () => {
        const emptyField = {
            schoolName: '',
            degree: '',
            speciality: '',
            startDate: '',
            endDate: '',
            checkboxPursuing: false,
            id: Math.floor(Math.random() * 100).toString(),
        }
        fieldArray.append(emptyField)
    }

    const handleDelete = (index: number) => {
        if (controlledFields.length > 1) {
            fieldArray.remove(index);
        }
    }
    const onSubmit = (data: FieldValues) => {
        router.push('/download')
        dispatch(setEducation(data.education));
        console.log(data.education);
    }
    useEffect(() => {
        setSelected(controlledFields[0]?.id);
    }, [])

    useEffect(() => {

        //handling add more functionality
        if (!education || education.length < controlledFields.length) {
            dispatch(setEducation(controlledFields));
            const expandedFieldIndex = controlledFields.length - 1;
            setSelected(controlledFields[expandedFieldIndex].id)
        }
        //handling delete collapsible
        else if (education && education.length > controlledFields.length) {
            console.log("else", controlledFields);

            if (controlledFields.length > 0) {
                dispatch(setEducation(controlledFields));
                const expandedFieldIndex = controlledFields.length - 1;

                setSelected(controlledFields[expandedFieldIndex].id)

            }
            else {
                toast.error('Profile should have at least one education field')
            }
        }

    }, [controlledFields.length]);

    console.log(education);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        // <motion.div
        //     animate={{ x: 1, opacity: [0, 1] }}
        //     initial={{ x: -150, opacity: 0 }}
        //     transition={{ duration: 0.2 }}
        // >
        <div>

            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-5'>

                        <div className="flex">
                            {
                                controlledFields.map((item, index) => (
                                    <Button
                                        type="button"
                                        key={index}
                                        onClick={() => setSelected(item.id)}
                                        className=
                                        {`
                                        ${selected === item.id ?
                                                'text-neutral-500 bg-red-100 hover:bg-red-100'
                                                :
                                                'bg-red-400 hover:bg-red-300'}
                                        rounded-none
                                        border-r-2
                                        flex 
                                        h-12
                                        w-48
                                        items-center 
                                        px-5`
                                        }
                                    >
                                        {item?.schoolName || 'School'}
                                        <X
                                            className="cursor-pointer ml-auto hover:bg-neutral-400 rounded-full"
                                            onClick={() => handleDelete(index)}
                                        />
                                    </Button>

                                ))

                            }
                            <Button
                                onClick={handleAddMore}
                                type="button"
                                className="flex 
                                        gap-2
                                        h-12
                                        rounded-none
                                        w-48
                                        hover:bg-red-300 
                                        items-center 
                                        bg-red-400 px-5">
                                Add More
                                <Plus />
                            </Button>
                        </div>


                        {
                            ((controlledFields.length === 0) ? education : controlledFields)?.map((item: Ieducation, index: number) => {
                                return (
                                    <>
                                        {
                                            item.id === selected &&
                                            <div className="py-5 px-10  bg-red-100 grid grid-cols-2 gap-5 text-neutral-500" key={index}>

                                                {/* schoolName */}
                                                <SchoolName
                                                    form={form}
                                                    index={index}
                                                />

                                                {/* speciality */}
                                                <Speciality
                                                    form={form}
                                                    index={index}
                                                />

                                                <div className="flex gap-2">

                                                    {/* startDate */}

                                                    <StartDate
                                                        form={form}
                                                        index={index}
                                                    />
                                                    {/* endDate */}
                                                    <EndDate
                                                        form={form}
                                                        index={index}
                                                    />

                                                    {/* checkboxPursuing */}
                                                    <CheckboxPursuing
                                                        form={form}
                                                        index={index}
                                                    />
                                                </div>

                                                {/* degree */}
                                                <Degree
                                                    form={form}
                                                    index={index}
                                                />

                                            </div>
                                        }

                                    </>
                                )
                            })
                        }

                        <div className='mt-auto flex justify-between'>
                            <LinkComp
                                
                                className='w-40 bg-gray-400 hover:bg-gray-300'
                                href={'/builder/prosummary'}>
                                Back
                            </LinkComp>
                            <Button
                                type="submit"
                                className='w-40'
                            >
                                Next
                            </Button>
                        </div>

                    </div>

                </form>
            </Form>
        </div >
        // </motion.div>
    )
}

export default EducationForm