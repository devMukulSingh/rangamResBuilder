import React, { FC } from "react";
import { IeducationForm } from "../EducationForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const StartDate: FC<IeducationForm> = ({ form, index }) => {
  return (
    <FormField
      defaultValue="2018-05"
      name={`education.${index}.startDate`}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Start Date</FormLabel>
          <FormControl>
            <Input
              className="bg-white h-14 rounded-sm"
              {...field}
              type="month"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default StartDate;
