import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { FC } from "react";
import { IExperienceForm } from "../ExperienceForm";
import MonthPicker from "@/components/commons/MonthPicker";

const EndDate: FC<IExperienceForm> = ({ form, index, controlledFields }) => {
  return (
    <FormField
      name={`experience.${index}.endDate`}
      control={form.control}
      render={({ field }) => (
        <FormItem className={`w-full ${form.getValues().experience[index].checkboxWorkingStatus ? 'invisible' : ''}`}>
          <FormLabel>End Date</FormLabel>
          <FormControl>
            <MonthPicker field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EndDate;
