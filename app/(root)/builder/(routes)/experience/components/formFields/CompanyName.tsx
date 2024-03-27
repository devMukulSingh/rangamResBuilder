import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { FC } from "react";
import { IExperienceForm } from "../ExperienceForm";
import { Input } from "@/components/ui/input";

const CompanyName: FC<IExperienceForm> = ({ form, index }) => {
  return (
    <FormField
      name={`experience.${index}.companyName`}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Company</FormLabel>
          <FormControl>
            <Input
              className="h-14 rounded-sm  bg-white"
              {...field}
              placeholder="Company name"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CompanyName;
