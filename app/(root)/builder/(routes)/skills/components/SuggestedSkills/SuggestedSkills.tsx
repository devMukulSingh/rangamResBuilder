'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FieldValues, useFieldArray, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setTechnicalSkills } from "@/redux/slice/userSlice";
import { useParams, useRouter } from "next/navigation";
import { setProgress } from "@/redux/slice/userSlice";
import { FC, useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { setFormComp } from "@/redux/slice/commonSlice";
import Spinner from "@/components/commons/Spinner";
import { motion } from "framer-motion"
import Skill from "./Skill";
import SkillsSkeleton from "./SkillsSkeleton";
import { SkillsProps } from "../Skills";


const SuggestedSkills = ({

}) => {

    const dispatch = useAppDispatch();
    const progress = useAppSelector(state => state.persistedReducer.progress);
    const customSkills = useAppSelector(state => state.persistedReducer.technicalSkills?.customSkills);
    const aiSuggestedSkills = useAppSelector(state => state.persistedReducer.aiSuggestedSkills);

    const form = useForm({
        defaultValues: {
            customSkills: customSkills || [
                {
                    skillName: ''
                }
            ]
        }
    });
    const fieldArray = useFieldArray({
        name: 'customSkills',
        control: form.control
    })
    const watchFieldsArray = form.watch('customSkills');

    const controlledFields = fieldArray.fields.map((field, index) => {
        return {
            ...field,
            ...watchFieldsArray[index]
        }
    })

    const onSubmit = () => {
        dispatch(setFormComp("Education"));
        if (progress <= 34) {
            dispatch(setProgress())
        }
    }
    const handleChange = () => {
        const customSkills = form.getValues().customSkills;
        const parsedSkills = customSkills.map(item => {
            return {
                skillName: item.skillName
            }
        })
        dispatch(setTechnicalSkills({
            customSkills: parsedSkills
        }));
    }
    const handleAddMore = () => {
        fieldArray.append({
            skillName: ''
        })
    }
    // const aiSuggestedSkills = [
    //     "HTML", "React", "NEXT", "Express", "ShadcnUI", "Tailwind",
    //     "HTML", "React", "NEXT", "Express",
    // ]
    return (
        // <motion.div
        //     animate={{ x: 1, opacity: [0, 1] }}
        //     initial={{ x: -150, opacity: 0 }}
        //     transition={{ duration: 0.2 }}
        // >
        <div className="space-y-5 h-fit ">
            <section>
                <h1
                    className=" 
                        font-semibold 
                        mb-5
                        text-neutral-500
                        text-lg
                        ">
                    Select AI Suggested Skill
                </h1>
                <div className="grid grid-cols-3  gap-5" >
                    {
                        aiSuggestedSkills ? aiSuggestedSkills?.map((skill) => (
                            <>
                                <Skill
                                    skill={skill}
                                    key={skill}
                                />

                            </>

                        ))
                            :
                            <SkillsSkeleton />
                    }
                    <Form {...form} >
                        <form
                            className="col-span-2"
                            onSubmit={form.handleSubmit(onSubmit)} onChange={handleChange}>
                            <div className="gap-5">
                                {
                                    controlledFields.map((item, index) => (
                                        <FormField
                                            key={index}
                                            name={`customSkills.${index}.skillName`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem >
                                                    <FormControl>
                                                        <Input
                                                            className="shadow-md rounded-sm bg-white py-6 w-full" {...field}
                                                            placeholder="You didn't find? Enter your skill" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ))
                                }

                                {/* <Button
                                            type="button"
                                            onClick={handleAddMore}
                                            variant="ghost"
                                            className="self-start flex items-center gap-2 bg-transparent"
                                        >
                                            <PlusCircle />
                                            Add more Skill
                                        </Button> */}

                            </div>
                        </form>
                    </Form>

                </div>

            </section>


        </div>
        // </motion.div>
    )

}

export default SuggestedSkills