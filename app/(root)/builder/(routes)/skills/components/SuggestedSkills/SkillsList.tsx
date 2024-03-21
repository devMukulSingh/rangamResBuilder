import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { setProgress } from "@/redux/slice/userSlice";
import { FC, Suspense, useEffect, useState } from "react";
import { Plus, PlusCircle } from "lucide-react";
import { setFormComp } from "@/redux/slice/commonSlice";
import Spinner from "@/components/commons/Spinner";
import { motion } from "framer-motion"
import Skill from "./Skill";
import SkillsSkeleton from "./SkillsSkeleton";
import { SkillsProps } from "../Skills";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setTechnicalSkills } from "@/redux/slice/userSlice";
import { FieldValues, useFieldArray, useForm } from "react-hook-form"


const SkillsList = () => {
    
    const dispatch = useAppDispatch();
    const aiSuggestedSkills = useAppSelector(state => state.persistedReducer.aiSuggestedSkills) || [];
    const skillFromState = useAppSelector(state => state.persistedReducer.technicalSkills);

    const form = useForm({

    });

    const handleAddMore = () => {
        const customSkill = form.getValues().customSkill;
        console.log(customSkill, "customSkill");
        if (customSkill !== '') {
            const combinedSkills = [...skillFromState, customSkill];
            dispatch(setTechnicalSkills(combinedSkills));
        }
        form.setValue("customSkill", "")
    }
    return (
        <div className="grid grid-cols-3  gap-5" >

            {
                aiSuggestedSkills ? aiSuggestedSkills?.map((skill, index) => (
                    <>
                        <Skill
                            skill={skill}
                            key={index}
                        />

                    </>

                ))
                    :
                    <SkillsSkeleton />
            }

            <Form {...form} >
                <form
                    className="col-span-2"
                >
                    <div className="gap-5">
                        <FormField
                            name="customSkill"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="flex gap-5" >
                                    <FormControl>
                                        <Input
                                            className="shadow-md rounded-sm bg-white py-6 w-full" {...field}
                                            placeholder="You didn't find? Enter your skill"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <Button
                                        type="button"
                                        onClick={handleAddMore}
                                        className="
                                        flex
                                        gap-2
                                    ">
                                        Add
                                    </Button>
                                </FormItem>
                            )}
                        />

                    </div>
                </form>
            </Form>

        </div>
    )
}

export default SkillsList