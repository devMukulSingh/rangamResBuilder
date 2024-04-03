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

const StartDate: FC<IeducationForm> = ({ form, index, handleChange }) => {
  const {
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <FormField
      name={`education.${index}.startDate`}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Start Date</FormLabel>
          <FormControl>
            <MonthPicker
              handleChange={handleChange}
              disabled={isSubmitting}
              disableFuture={true}
              field={field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default StartDate;
