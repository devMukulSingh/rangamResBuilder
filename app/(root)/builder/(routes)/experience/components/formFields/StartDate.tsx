import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useAppSelector } from '@/redux/hooks/hooks'
import React, { FC } from 'react'
import Skill from '../Competence';
import { IExperienceForm } from '../ExperienceForm';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const StartDate: FC<IExperienceForm> = ({
    form,
    index,
    controlledFields
}) => {


    return (
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
    )
}

export default StartDate