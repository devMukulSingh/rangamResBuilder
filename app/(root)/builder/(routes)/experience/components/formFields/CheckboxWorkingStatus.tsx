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
  return (
    <FormField
      name={`experience.${index}.checkboxWorkingStatus`}
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex mt-auto  gap-4 ">
          <FormControl>
            <Checkbox
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
