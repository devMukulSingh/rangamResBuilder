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

const Speciality: FC<IeducationForm> = ({ form, index }) => {
  const {
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <FormField
      name={`education.${index}.speciality`}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Specialisation</FormLabel>
          <FormControl>
            <Input
              disabled={isSubmitting}
              className="bg-white h-14 rounded-sm"
              {...field}
              placeholder="Computer science"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Speciality;
