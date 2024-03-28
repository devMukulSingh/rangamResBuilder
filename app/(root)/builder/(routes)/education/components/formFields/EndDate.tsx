import React, { FC } from "react";
import { IeducationForm } from "../EducationForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import MonthPicker from "@/components/commons/MonthPicker";

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
            <MonthPicker field={field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default EndDate;
