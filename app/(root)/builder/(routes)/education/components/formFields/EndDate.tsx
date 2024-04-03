import React, { FC } from "react";
import { IeducationForm } from "../EducationForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MonthPicker from "@/components/commons/MonthPicker";

const EndDate: FC<IeducationForm> = ({ form, index }) => {
  const {
    control,
    formState: { isSubmitting },
  } = form;

  const minDate = form.getValues().education[index].startDate;
  return (
    <FormField
      name={`education.${index}.endDate`}
      control={form.control}
      render={({ field }) => (
        <FormItem
          className={`${
            form.getValues().education[index].checkboxPursuing
              ? "invisible"
              : "visible"
          }`}
        >
          <FormLabel>End Date</FormLabel>
          <FormControl>
            <MonthPicker
              field={field}
              minDate={minDate}
              disabled={
                isSubmitting || !form.getValues().education[index].startDate
                  ? true
                  : false
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EndDate;
