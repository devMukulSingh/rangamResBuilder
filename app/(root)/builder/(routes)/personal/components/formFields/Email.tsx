import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { FC } from 'react'
import { IForm } from '../PersonalForm'

const Email:FC<IForm> = ({
    form
}) => {
    return (
        <FormField
        name="email"
        control={form.control}
        render={({ field }) => (
            <FormItem >
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                    <Input
                        className="bg-white" {...field}
                        placeholder="deepak@gmail.com"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
    )
}

export default Email