import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useAppSelector } from '@/redux/hooks/hooks'
import React, { FC } from 'react'
import Skill from '../Competence';
import { IExperienceForm } from '../ExperienceForm';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const CheckboxWorkingStatus: FC<IExperienceForm> = ({
    form,
    index,
    controlledFields
}) => {


    return (
        <FormField
            name={`experience.${index}.checkboxWorkingStatus`}
            control={form.control}
            render={({ field }) => (
                <FormItem
                    className="flex mt-auto self-center justify-center  gap-4">
                    <FormControl>
                        <Checkboxw
                            className="size-6 bg-white border-none"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <FormLabel>Currently working here</FormLabel>
                </FormItem>
            )}

        />
    )
}

export default CheckboxWorkingStatus