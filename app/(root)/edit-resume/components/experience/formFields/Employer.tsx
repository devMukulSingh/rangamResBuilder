import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { FC } from "react";
import { Input } from "@/components/ui/input";
import { IExperienceForm } from "@/app/(root)/builder/(routes)/experience/components/ExperienceForm";

const Employer: FC<IExperienceForm> = ({ form, index }) => {
  return (
    <FormField
      name={`experience.${index}.employer`}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Employer</FormLabel>
          <FormControl>
            <Input
              placeholder="Rangam.com"
              className="bg-white h-14 rounded-sm"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Employer;
