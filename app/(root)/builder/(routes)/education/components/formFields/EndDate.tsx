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

const EndDate: FC<IeducationForm> = ({ form, index }) => {
  return (
    <FormField
      defaultValue="2018-05"
      name={`education.${index}.endDate`}
      control={form.control}
      render={({ field }) => (
        <FormItem
          className={`${form.getValues().education[index].checkboxPursuing ? "invisible" : "visible"}`}
        >
          <FormLabel>End Date</FormLabel>
          <FormControl>
            <Input
              type="month"
              className="bg-white h-14 rounded-sm"
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default EndDate;
