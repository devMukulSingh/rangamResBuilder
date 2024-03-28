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


const StartDate: FC<IeducationForm> = ({ form, index }) => {
  return (
    <FormField
      name={`education.${index}.startDate`}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Start Date</FormLabel>
          <FormControl>
            <MonthPicker field={field}/>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default StartDate;
