'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFieldArray, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { setExperience } from "@/redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useEffect, useState } from "react";
import { Plus, PlusCircle, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams, useRouter } from "next/navigation";
import { setProgress } from "@/redux/slice/userSlice";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { setFormComp } from "@/redux/slice/commonSlice";
const RichTextEditor = dynamic(() => import('@/components/commons/RichTextEditor'), {
    ssr: false
});
import { motion } from "framer-motion"
import Skill from "./Skill";


const ExperienceForm = () => {

    const progress = useAppSelector(state => state.persistedReducer.progress);
    const [expanded, setExpanded] = useState<string | false>("");
    const dispatch = useAppDispatch();
    const experience = useAppSelector(state => state.persistedReducer.experience);

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
                    selectedSkills: []
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
    })

    const onSubmit = () => {
        dispatch(setFormComp("Skills"))
        if (progress <= 22) {
            dispatch(setProgress())
        }
    }
    const handleChange = () => {
        const experience = form.getValues().experience;

        const parsedExperience = experience.map(item => {
            return {
                // description: item.description
                // employer: item.employer,
                // address: item.address,
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
            // bio: '',
            // address: '',
            // employer: '',
            // description: '',
        });

    }
    // const handleCollapsible = (id: string, isExpanded: boolean) => {

    //     if (isExpanded) {
    //         setExpanded(false)
    //     }
    //     else {
    //         setExpanded(id);
    //     }
    // }
    // const handleDelete = (index: number) => {
    //     if (controlledFields.length > 0) {
    //         fieldArray.remove(index);
    //     }
    // }

    useEffect(() => {
        setExpanded(controlledFields[0]?.id);
    }, [])

    // useEffect(() => {
    //     //handling add more functionality
    //     if (!experience || experience.length < controlledFields.length) {
    //         dispatch(setExperience(controlledFields));
    //         const expandedFieldIndex = controlledFields.length - 1;
    //         setExpanded(controlledFields[expandedFieldIndex].id)
    //     }
    //     //handling delete collapsible
    //     else if (experience && experience.length > controlledFields.length) {
    //         if (controlledFields.length > 0) {
    //             dispatch(setExperience(controlledFields));
    //         }
    //         else {
    //             toast.error('Profile should have at least one experience field')
    //         }
    //     }

    // }, [controlledFields.length]);
    const skills = [
        "HTML", "React", "NEXT", "Express", "ShadcnUI", "Tailwind",
        "HTML", "React", "NEXT", "Express",
    ]
    return (
        // <motion.div
        //     animate={{ x: 1, opacity: [0, 1] }}
        //     initial={{ x: -150, opacity: 0 }}
        //     transition={{ duration: 0.2 }}
        // >
        <div className="py-5 px-10  bg-red-100">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} onChange={handleChange} >
                    <div className="flex flex-col gap-5 ">
                        {
                            (!experience ? controlledFields : experience)?.map((item, index) => {
                                return (
                                    <>
                                        {/* <div className="flex hover:bg-red-300 items-center bg-red-400 px-5">
                                                <Trash
                                                    className="ml-auto cursor-pointer text-neutral-200"
                                                    onClick={() => handleDelete(index)} />
                                            </div> */}

                                        <div className="grid grid-cols-4 gap-5 w-full">

                                            {/* CompanyName */}
                                            <FormField
                                                name={`experience.${index}.companyName`}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <FormItem >
                                                        <FormLabel>Company</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                className="h-14 rounded-sm bg-white"
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
                                            <div className="flex flex-col gap-2 justify-end text-neutral-500">
                                                <FormField
                                                    name={`experience.${index}.checkboxInternship`}
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <FormItem className="flex items-center gap-4">
                                                            <FormControl>
                                                                <Checkbox
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

                                            <Button
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
                                            </Button>

                                        </div>


                                        {/* start and endDate */}
                                        <div className="grid grid-cols-4 gap-5">

                                            <div className="flex gap-2">
                                                <FormField
                                                    name={`experience.${index}.startDate`}
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <FormItem >
                                                            <FormLabel>Start Date</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="bg-white h-14 rounded-sm" {...field} type="date" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                {
                                                    experience && !experience?.[index]?.checkboxInternship &&
                                                    <FormField
                                                        name={`experience.${index}.endDate`}
                                                        control={form.control}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>End Date</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="MM YY"
                                                                        type="date"
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

                                        <FormField
                                            name={`experience.${index}.selectedSkills`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <div className="grid grid-cols-7 gap-2">
                                                    {
                                                        skills.map((skill,index) => (
                                                            <FormItem key={index}>
                                                                <FormControl>
                                                                    <Skill onChange={field.onChange} skill={skill}/>
                                                                </FormControl>
                                                            </FormItem>
                                                        ))
                                                    }
                                                </div>

                                            )}
                                        />
                                    </>

                                )

                            })
                        }


                    </div>
                </form>
            </Form>
        </div>
        // </motion.div>
    )
}

export default ExperienceForm