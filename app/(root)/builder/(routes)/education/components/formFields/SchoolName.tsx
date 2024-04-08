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

const SchoolName: FC<IeducationForm> = ({ form, index }) => {
  const {
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <FormField
      name={`education.${index}.schoolName`}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>University/School Name</FormLabel>
          <FormControl>
            <Input
              disabled={isSubmitting}
              className="bg-white h-14 rounded-sm"
              {...field}
              placeholder="University/School Name"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SchoolName;
