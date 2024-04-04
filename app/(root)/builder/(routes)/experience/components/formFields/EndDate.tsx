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

const EndDate: FC<IExperienceForm> = ({ form, index, handleChange }) => {
  const {
    control,
    formState: { isSubmitting },
    getValues,
  } = form;
  const minDate = getValues().experience[index].startDate;

  return (
    <FormField
      name={`experience.${index}.endDate`}
      control={control}
      render={({ field }) => (
        <FormItem
          className={`w-full ${getValues().experience[index].checkboxWorkingStatus ? "invisible" : ""}`}
        >
          <FormLabel>End Date</FormLabel>
          <FormControl>
            <MonthPicker
              handleChange={handleChange}
              minDate={minDate}
              disabled={
                isSubmitting || !getValues().experience[index].startDate
                  ? true
                  : false
              }
              field={field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EndDate;
