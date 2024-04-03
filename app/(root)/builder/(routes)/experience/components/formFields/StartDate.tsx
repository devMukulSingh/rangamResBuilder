import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { FC, useState } from "react";
import { IExperienceForm } from "../ExperienceForm";
import { Input } from "@/components/ui/input";
import MonthPicker from "@/components/commons/MonthPicker";

const StartDate: FC<IExperienceForm> = ({ form, index }) => {
  const {
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <FormField
      name={`experience.${index}.startDate`}
      control={control}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Start Date</FormLabel>
          <MonthPicker
            disabled={isSubmitting}
            disableFuture={true}
            field={field}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default StartDate;
