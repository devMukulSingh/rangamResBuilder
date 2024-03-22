import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { FC } from 'react'
import { IForm } from '../PersonalForm'

const Profession: FC<IForm> = ({
    form
}) => {
    return (
        <FormField
            name="profession"
            control={form.control}
            render={({ field }) => (
                <FormItem className="w-full" >
                    <FormLabel>Desired job title</FormLabel>
                    <FormControl>
                        <Input

                            className="bg-white" {...field}
                            placeholder="Specify your desired job title"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default Profession