import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { useAppSelector } from '@/redux/hooks/hooks'
import React, { FC } from 'react'
import { IExperienceForm } from '../ExperienceForm';
import { Plus } from 'lucide-react';
import Competence from '../Competence';

const Competences: FC<IExperienceForm> = ({
    form,
    index,
}) => {

    const aiSuggestedComp = useAppSelector(state => state.persistedReducer.aiSuggestedComp);
    
    return (
        <FormField
            name={`experience.${index}.competences`}
            control={form.control}
            render={({ field }) => (
                <div className="grid grid-cols-6 gap-5">
                    {
                        aiSuggestedComp.map((competence, i) => (
                            <FormItem key={i}>
                                <FormControl>
                                    <Competence
                                        form={form}
                                        index={index}
                                        onChange={field.onChange}
                                        competence={competence} />
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

    )
}

export default Competences