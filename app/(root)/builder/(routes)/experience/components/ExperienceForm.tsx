'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFieldArray, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { setExperience } from "@/redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {  useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { setProgress } from "@/redux/slice/userSlice";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import('@/components/commons/RichTextEditor'), {
    ssr: false
});

import { motion } from "framer-motion"
import Skill from "./Skill";

const ExperienceForm = ({

}) => {

    const progress = useAppSelector(state => state.persistedReducer.progress);
    const [selected, setSelected] = useState<string | false>("");
    const dispatch = useAppDispatch();
    const experience = useAppSelector(state => state.persistedReducer.experience) || [];
    const selectedSkills = useAppSelector(state => state.persistedReducer.technicalSkills);

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
                    selectedSkills: [],
                    description: ''
                    // employer: '',
                    // address: '',
                    // bio: '',
                    // description: '',
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

    const onSubmit = () => {

    }
    const handleChange = () => {
        const experience = form.getValues().experience;

        const parsedExperience = experience.map(item => {
            return {
                // employer: item.employer,
                // address: item.address,
                description: item.description,
                companyName: item.companyName,
                jobTitle: item.jobTitle,
                startDate: item.startDate,
                endDate: item.endDate,
                id: item.id,
                checkboxWorkingStatus: item.checkboxWorkingStatus,
                checkboxVolunteering: item.checkboxVolunteering,
                checkboxInternship: item.checkboxInternship,
                selectedSkills: item.selectedSkills
            }
        })
        dispatch(setExperience(parsedExperience));
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
            selectedSkills: [],
            id: Math.floor(Math.random() * 100).toString(),
            description: '',
            // bio: '',
            // address: '',
            // employer: '',
        });
        console.log(controlledFields);

        // setSelected()

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
        <div>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} onChange={handleChange} >

                    <div className="flex">
                        {
                            controlledFields.map((item, index) => (
                                <Button
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
                        (controlledFields)?.map((item, index) => {
                            return (
                                <>
                                    {
                                        item.id === selected &&
                                        <div className=" bg-red-100 py-5 px-10 flex flex-col gap-5 " key={index}>

                                            <div className="grid grid-cols-3 gap-5 w-full">

                                                {/* CompanyName */}
                                                <FormField
                                                    name={`experience.${index}.companyName`}
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <FormItem >
                                                            <FormLabel>Company</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="h-14 rounded-sm  bg-white"
                                                                    {...field}
                                                                    placeholder="Rangam" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                {/* jobTitle */}
                                                <FormField
                                                    name={`experience.${index}.jobTitle`}
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <FormItem >
                                                            <FormLabel>jobTitle</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Jr. Frontend Developer"
                                                                    className="bg-white h-14 rounded-sm" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                {/* checkboxes */}
                                                <div className="flex gap-2 items-end text-neutral-500">
                                                    <div className="flex flex-col gap-2 ">

                                                        <FormField
                                                            name={`experience.${index}.checkboxInternship`}
                                                            control={form.control}
                                                            render={({ field }) => (
                                                                <FormItem className="flex items-center gap-4">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            disabled={controlledFields[index].checkboxVolunteering ? true : false}
                                                                            className="size-6 bg-white border-none"
                                                                            checked={field.value}
                                                                            onCheckedChange={field.onChange}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel>Internship</FormLabel>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            name={`experience.${index}.checkboxVolunteering`}
                                                            control={form.control}
                                                            render={({ field }) => (
                                                                <FormItem className="flex items-center gap-4">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            disabled={controlledFields[index].checkboxInternship ? true : false}
                                                                            className="size-6 bg-white border-none"
                                                                            checked={field.value}
                                                                            onCheckedChange={field.onChange}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel>Volunteering</FormLabel>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    {/* <Button
                                                        onClick={handleAddMore}
                                                        size="icon"
                                                        className="
                                                bg-red-400 
                                                rounded-full
                                                h-[4rem]
                                                w-[4rem]
                                                shadow-md
                                                ml-auto
                                                
                                                ">
                                                        <Plus size={50} />
                                                    </Button> */}
                                                </div>



                                            </div>


                                            {/* start and endDate */}
                                            <div className="grid grid-cols-3 gap-5">

                                                <div className="flex gap-2 ">
                                                    <FormField
                                                        name={`experience.${index}.startDate`}
                                                        control={form.control}
                                                        render={({ field }) => (
                                                            <FormItem
                                                                className=""
                                                            >
                                                                <FormLabel>Start Date</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        className="bg-white h-14 rounded-sm"
                                                                        {...field}
                                                                        type="month" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    {
                                                        experience && !experience?.[index]?.checkboxWorkingStatus &&
                                                        <FormField
                                                            name={`experience.${index}.endDate`}
                                                            control={form.control}
                                                            render={({ field }) => (
                                                                <FormItem className="">
                                                                    <FormLabel>End Date</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="MM YY"
                                                                            type="month"
                                                                            className="h-14 rounded-sm bg-white" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    }
                                                </div>

                                                {/* checkbox */}
                                                <FormField
                                                    name={`experience.${index}.checkboxWorkingStatus`}
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <FormItem
                                                            className="flex mt-auto  gap-4">
                                                            <FormControl>
                                                                <Checkbox
                                                                    className="size-6 bg-white border-none"
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <FormLabel>Currently working here</FormLabel>
                                                        </FormItem>
                                                    )}

                                                />
                                            </div>

                                            <h1 className="text-2xl text-neutral-500">
                                                Great! To highlight your experience and describe it properly, please choose the key responsibilities at this workplace.
                                            </h1>

                                            {/* skills */}
                                            <FormField
                                                name={`experience.${index}.selectedSkills`}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <div className="grid grid-cols-6 gap-5">
                                                        {
                                                            selectedSkills.map((skill, i) => (
                                                                <FormItem key={i}>
                                                                    <FormControl>
                                                                        <Skill
                                                                            index={index}
                                                                            handleChange={handleChange}
                                                                            onChange={field.onChange}
                                                                            skill={skill} />
                                                                    </FormControl>
                                                                </FormItem>
                                                            ))
                                                        }
                                                        <div
                                                            className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        col-span-2
                                                        cursor-pointer
                                                    ">
                                                            <Plus color="#EF4444" />
                                                            <h1
                                                                className="
                                                            text-red-500
                                                            ">
                                                                Load More key responsibility
                                                            </h1>
                                                        </div>
                                                    </div>

                                                )}
                                            />

                                            {/* description */}
                                            <FormField
                                                name={`experience.${index}.description`}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <FormItem >
                                                        <FormControl>
                                                            <RichTextEditor
                                                                value={field.value || ''}
                                                                onChange={(content) => {
                                                                    field.onChange(content);
                                                                    handleChange();
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    }


                                </>

                            )

                        })
                    }


                </form>
            </Form>
        </div>
        // </motion.div>
    )
}

export default ExperienceForm