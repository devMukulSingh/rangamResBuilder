import React, { FC } from "react";
import { IeducationForm } from "../EducationForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const SchoolName: FC<IeducationForm> = ({ form, index }) => {
  return (
    <FormField
      name={`education.${index}.schoolName`}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>School Name</FormLabel>
          <FormControl>
            <Input
              className="bg-white h-14 rounded-sm"
              {...field}
              placeholder="School Name"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default SchoolName;
