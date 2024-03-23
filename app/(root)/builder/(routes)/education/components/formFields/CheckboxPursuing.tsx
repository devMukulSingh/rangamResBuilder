import React, { FC } from 'react'
import { IeducationForm } from '../EducationForm'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'

const CheckboxPursuing: FC<IeducationForm> = ({
  form,
  index
}) => {
  return (

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

  )
}

export default CheckboxPursuing