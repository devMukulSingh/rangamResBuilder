'use client'
import { Form } from "@/components/ui/form"
import { FieldArray, useFieldArray, useForm, UseFormReturn, FieldValues } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { setAiSuggestedComp, setExperience } from "@/redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { FC, useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import { Iexperience } from "@/lib/types";
import Competences from "./formFields/Competences";
import CompanyName from "./formFields/CompanyName";
import JobTitle from "./formFields/JobTitle";
import CheckboxInternship from "./formFields/CheckboxInternship";
import CheckboxVolunteering from "./formFields/CheckboxVolunteering";
import Description from "./formFields/Description";
import CheckboxWorkingStatus from "./formFields/CheckboxWorkingStatus";
import EndDate from "./formFields/EndDate";
import StartDate from "./formFields/StartDate";
import LinkComp from "@/components/ui/LinkComp";
import { useRouter } from "next/navigation";
import Link from "next/link";


interface ExperienceFormProps {
    parsedCompetences: string[]
}
export interface IExperienceForm {
    form: UseFormReturn<{
        experience: Iexperience[];
    }, any, undefined>,
    index: number,
    controlledFields?: Iexperience[]
}
const ExperienceForm: FC<ExperienceFormProps> = ({
    parsedCompetences
}) => {

    const router = useRouter();
    const [selected, setSelected] = useState<string | false>("");
    const dispatch = useAppDispatch();
    const experience = useAppSelector(state => state.persistedReducer.experience) || [];

    const form = useForm({
        defaultValues: {
            experience: experience || [
                {
                    companyName: '',
                    endDate: '',
                    startDate: '',
                    jobTitle: '',
                    id: Math.floor(Math.random() * 100).toString(),
                    checkboxWorkingStatus: false,
                    checkboxVolunteering: false,
                    checkboxInternship: false,
                    competences: [],
                    description: ''

                }
            ]
        }
    });

    const fieldArray = useFieldArray({
        name: 'experience',
        control: form.control
    })

    const watchFieldsArray = form.watch('experience');

    const controlledFields = fieldArray.fields.map((field, index) => {
        return {
            ...field,
            ...watchFieldsArray[index]
        }
    }) || []

    const onSubmit = (data: FieldValues) => {
        router.push('/builder/prosummary')
        dispatch(setExperience(data.experience));
    }

    const handleAddMore = () => {
        fieldArray.append({
            companyName: '',
            jobTitle: '',
            startDate: '',
            endDate: '',
            checkboxWorkingStatus: false,
            checkboxVolunteering: false,
            checkboxInternship: false,
            competences: [],
            id: Math.floor(Math.random() * 100).toString(),
            description: '',
        });


    }

    const handleDelete = (index: number) => {
        if (controlledFields.length > 1) {
            fieldArray.remove(index);
        }
        else {
            toast.error('Profile should have at least one experience field')
        }
    }

    useEffect(() => {
        setAiSuggestedComp(parsedCompetences);
        setSelected(controlledFields[0]?.id);
    }, []);


    useEffect(() => {
        //handling add more functionality
        if (!experience || experience.length < controlledFields.length) {
            dispatch(setExperience(controlledFields));
            const selectedFieldIndex = controlledFields.length - 1;
            setSelected(controlledFields[selectedFieldIndex].id)
        }
        //handling delete collapsible
        else if (experience && experience.length > controlledFields.length) {
            if (controlledFields.length > 0) {
                dispatch(setExperience(controlledFields));
                const selectedFieldIndex = controlledFields.length - 1;
                setSelected(controlledFields[selectedFieldIndex].id)
            }

        }

    }, [controlledFields.length]);



    return (
        // <motion.div
        //     animate={{ x: 1, opacity: [0, 1] }}
        //     initial={{ x: -150, opacity: 0 }}
        //     transition={{ duration: 0.2 }}
        // >
        <>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <div className="flex flex-col gap-5">

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
                                        {item?.companyName || 'Company'}
                                        <X
                                            className="cursor-pointer ml-auto hover:bg-neutral-400 rounded-full"
                                            onClick={() => handleDelete(index)}
                                        />
                                    </Button>

                                ))

                            }
                            <Button
                                type="button"
                                onClick={handleAddMore}
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
                            ((controlledFields.length === 0) ? experience : controlledFields)?.map((item, index) => {
                                return (
                                    <>
                                        {
                                            item.id === selected &&
                                            <div className=" bg-red-100 py-5 px-10 flex flex-col gap-5 " key={index}>

                                                <div className="grid grid-cols-3 gap-5 w-full">
                                                    {/* CompanyName */}
                                                    <CompanyName
                                                        index={index}
                                                        form={form}
                                                    />

                                                    {/* jobTitle */}
                                                    <JobTitle
                                                        index={index}
                                                        form={form}
                                                    />
                                                    {/* checkboxes */}
                                                    <div className="flex flex-col gap-2 mt-auto text-neutral-500">
                                                        <CheckboxInternship
                                                            index={index}
                                                            form={form}
                                                            controlledFields={controlledFields}
                                                        />
                                                        <CheckboxVolunteering
                                                            index={index}
                                                            form={form}
                                                            controlledFields={controlledFields}
                                                        />
                                                    </div>

                                                </div>


                                                {/* start and endDate */}
                                                <div className="grid grid-cols-3 gap-5">

                                                    <div className="flex gap-2 ">
                                                        <StartDate
                                                            index={index}
                                                            form={form}
                                                            controlledFields={controlledFields}
                                                        />
                                                        {
                                                            !controlledFields?.[index]?.checkboxWorkingStatus &&
                                                            <EndDate
                                                                index={index}
                                                                form={form}
                                                                controlledFields={controlledFields}
                                                            />
                                                        }
                                                    </div>

                                                    {/* checkbox */}
                                                    <CheckboxWorkingStatus
                                                        index={index}
                                                        form={form}
                                                        controlledFields={controlledFields}
                                                    />
                                                </div>

                                                <h1 className="text-2xl text-neutral-500">
                                                    Great! To highlight your experience and describe it properly, please choose the key responsibilities at this workplace.
                                                </h1>

                                                {/* Competences */}
                                                <Competences
                                                    index={index}
                                                    form={form}
                                                />
                                                {/* description */}
                                                <Description
                                                    index={index}
                                                    form={form}
                                                />
                                            </div>
                                        }

                                    </>

                                )

                            })
                        }
                        <div className='mt-auto flex justify-between h-10'>
                            <LinkComp
                                className="w-40 bg-gray-400 hover:bg-gray-300"
                                href={`/builder/skills`}>
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
        </>
        // </motion.div>
    )
}

export default ExperienceForm