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
  return (
    <FormField
      name={`education.${index}.speciality`}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Speciality</FormLabel>
          <FormControl>
            <Input
              className="bg-white h-14 rounded-sm"
              {...field}
              placeholder=""
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default Speciality;
