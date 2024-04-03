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

const Degree: FC<IeducationForm> = ({ form, index }) => {
  const {
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <FormField
      defaultValue="Bachelor's degree"
      name={`education.${index}.degree`}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Degree Name</FormLabel>
          <FormControl>
            <Input
              disabled={isSubmitting}
              className="bg-white h-14 rounded-sm"
              placeholder="Degree Name"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Degree;
