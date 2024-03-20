'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FieldValues, useFieldArray, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setEducation } from "@/redux/slice/userSlice";
import { useEffect, useState } from "react";
import { Ieducation } from "@/lib/types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useParams, useRouter } from "next/navigation";
import { setProgress } from "@/redux/slice/userSlice";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { setFormComp } from "@/redux/slice/commonSlice";
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const EducationForm = () => {

    const [expanded, setExpanded] = useState<string | false>("");
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { templateId } = useParams();
    const progress = useAppSelector(state => state.persistedReducer.progress);
    const education = useAppSelector(state => state.persistedReducer.education);


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

    const onSubmit = () => {
    }
    const handleChange = () => {
        const education = form.getValues().education;
        const parsedEducation = education.map((item) => {
            return {
                schoolName: item.schoolName,
                degree: item.degree,
                speciality: item.speciality,
                startDate: item.startDate,
                endDate: item.endDate,
                id: item.id,
            }
        })

        dispatch(setEducation(parsedEducation));

    }
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

    const handleCollapsible = (id: string, isExpanded: boolean) => {

        if (isExpanded) {
            setExpanded(false)
        }
        else {
            setExpanded(id);
        }
    }

    const handleDelete = (index: number) => {
        if (controlledFields.length > 0) {
            fieldArray.remove(index);
        }
    }
    useEffect(() => {
        setExpanded(controlledFields[0]?.id);
    }, [])

    useEffect(() => {

        //handling add more functionality
        if (!education || education.length < controlledFields.length) {
            dispatch(setEducation(controlledFields));
            const expandedFieldIndex = controlledFields.length - 1;
            setExpanded(controlledFields[expandedFieldIndex].id)
        }
        //handling delete collapsible
        else if (education && education.length > controlledFields.length) {
            console.log("else", controlledFields);

            if (controlledFields.length > 0) {
                dispatch(setEducation(controlledFields));
            }
            else {
                toast.error('Profile should have at least one education field')
            }
        }

    }, [controlledFields.length]);


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        // <motion.div
        //     animate={{ x: 1, opacity: [0, 1] }}
        //     initial={{ x: -150, opacity: 0 }}
        //     transition={{ duration: 0.2 }}
        // >
        <div className="px-10 py-10 bg-red-100 rounded-md">

            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} onChange={handleChange}>
                    <div className="flex flex-col gap-10">

                        {
                            (!education ? controlledFields : education)?.map((item: Ieducation, index: number) => {
                                return (
                                    <div className="grid grid-cols-2 gap-5 text-neutral-500" key={index}>
                                        {/* <Collapsible
                                                onOpenChange={() => handleCollapsible(item.id, item.id === expanded)}
                                                className="space-y-2 transition"
                                                open={item.id === expanded}
                                            > */}


                                        {/* <CollapsibleContent
                                                    key={item.id}
                                                    className={
                                                        `flex
                                                     flex-col
                                                      gap-5
                                                       border 
                                                       p-5 
                                                       transition-transform 
                                                       data-[state=open]:animate-accordion-down 
                                                       `}
                                                > */}


                                        {/* schoolName */}
                                        <FormField
                                            name={`education.${index}.schoolName`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem >
                                                    <FormLabel>School Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="bg-white h-14 rounded-sm" {...field}
                                                            placeholder="Delhi University" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />




                                        {/* speciality */}
                                        <FormField
                                            name={`education.${index}.speciality`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem >
                                                    <FormLabel>Speciality</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="bg-white h-14 rounded-sm" {...field}
                                                            placeholder=""
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="flex gap-2">

                                            {/* startDate */}
                                            <FormField
                                                defaultValue="2018-05"
                                                name={`education.${index}.startDate`}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <FormItem >
                                                        <FormLabel>Start Date</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                className="bg-white h-14 rounded-sm" {...field}
                                                                type="month" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* endDate */}

                                            <FormField
                                                defaultValue="2018-05"
                                                name={`education.${index}.endDate`}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <FormItem
                                                        className={`${form.getValues().education[index].checkboxPursuing ? 'invisible' : 'visible'}`}
                                                    >
                                                        <FormLabel>End Date</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="month"
                                                                className="bg-white h-14 rounded-sm" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />


                                            {/* checkboxPursuing */}
                                            <FormField
                                                name={`education.${index}.checkboxPursuing`}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <FormItem className="flex self-end mx-auto gap-2">
                                                        <FormControl>
                                                            <Checkbox
                                                                className="size-6 bg-white border-none"
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormLabel>Pursuing</FormLabel>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* degree */}
                                        <FormField
                                            name={`education.${index}.degree`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem >
                                                    <FormLabel>Degree/Program</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="bg-white h-14 rounded-sm" >
                                                                <SelectValue placeholder="Bachelor in Technology" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="light">Bachelor in Technology</SelectItem>
                                                                <SelectItem value="dark">Bachelor in Technology</SelectItem>
                                                                <SelectItem value="system">Bachelor in Technology</SelectItem>
                                                            </SelectContent>
                                                        <FormMessage />
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />

                                        {/* </CollapsibleContent> */}
                                        {/* </Collapsible> */}
                                    </div>

                                )
                            })
                        }

                        {/* <div className="flex gap-5">
                            <Button
                                type="button"
                                onClick={handleAddMore}
                                className="w-full">
                                Add More
                            </Button>
                            <Button
                                type="submit"
                                className="w-full">
                                Next
                            </Button>
                        </div> */}
                    </div>

                </form>
            </Form>
        </div >
        // </motion.div>
    )
}

export default EducationForm