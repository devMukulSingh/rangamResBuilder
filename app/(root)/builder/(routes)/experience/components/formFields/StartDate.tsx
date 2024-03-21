import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { FC } from 'react'
import { IExperienceForm } from '../ExperienceForm';
import { Input } from '@/components/ui/input';

const StartDate: FC<IExperienceForm> = ({
    form,
    index,
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