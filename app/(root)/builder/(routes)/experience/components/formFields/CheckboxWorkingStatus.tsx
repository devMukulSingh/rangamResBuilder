import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import React, { FC } from "react";
import { IExperienceForm } from "../ExperienceForm";

import { Checkbox } from "@/components/ui/checkbox";

const CheckboxWorkingStatus: FC<IExperienceForm> = ({ form, index }) => {
  const { control, getValues, formState: {isSubmitting} } = form;
  const minDate = getValues().experience[index].startDate;
  
  return (
    <FormField
      name={`experience.${index}.checkboxWorkingStatus`}
      control={control}
      render={({ field }) => (
        <FormItem className="flex mt-auto  gap-4 ">
          <FormControl>
            <Checkbox
              disabled={isSubmitting}
              className="size-6 bg-white border"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormLabel>Currently working here</FormLabel>
        </FormItem>
      )}
    />
  );
};

export default CheckboxWorkingStatus;
