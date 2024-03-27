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

const StartDate: FC<IExperienceForm> = ({ form, index }) => {
  return (
    <FormField
      name={`experience.${index}.startDate`}
      control={form.control}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel>Start Date</FormLabel>
          <Input
            placeholder="MM YY"
            type="month"
            className="h-14 rounded-sm bg-white"
            {...field}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default StartDate;
