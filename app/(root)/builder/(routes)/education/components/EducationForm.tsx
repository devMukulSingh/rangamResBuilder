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
import { Plus, Trash, X } from "lucide-react";
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

    const [selected, setSelected] = useState<string>("");
    const dispatch = useAppDispatch();
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

    const handleDelete = (index: number) => {
        if (controlledFields.length > 1) {
            fieldArray.remove(index);
        }
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


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        // <motion.div
        //     animate={{ x: 1, opacity: [0, 1] }}
        //     initial={{ x: -150, opacity: 0 }}
        //     transition={{ duration: 0.2 }}
        // >
        <div>

            <Form {...form} >
                <form onChange={handleChange}>

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
                        controlledFields?.map((item: Ieducation, index: number) => {
                            return (
                                <>
                                    {
                                        item.id === selected &&
                                        <div className="py-5 px-10  bg-red-100 grid grid-cols-2 gap-5 text-neutral-500" key={index}>

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
                                    }

                                </>
                            )
                        })
                    }


                </form>
            </Form>
        </div >
        // </motion.div>
    )
}

export default EducationForm