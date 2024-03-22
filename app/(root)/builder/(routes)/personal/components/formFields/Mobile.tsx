import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { FC } from 'react'
import { IForm } from '../PersonalForm'

const Mobile:FC<IForm> = ({
    form
}) => {
    return (

            <FormField
                name="mobile"
                control={form.control}
                render={({ field }) => (
                    <FormItem className="w-1/2" >
                        <FormLabel>Mobile</FormLabel>
                        <FormControl>
                            <Input
                                className="bg-white" {...field}
                                placeholder="Mobile number"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
    )
}

export default Mobile