import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { FC } from "react";
import { IForm } from "../PersonalForm";

const Name: FC<IForm> = ({ form }) => {
  return (
    <FormField
      name="fullName"
      control={form.control}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Full Name</FormLabel>
          <FormControl>
            <Input
              className="bg-white"
              {...field}
              placeholder="Enter your full name"
            />
          </FormControl>
          <FormMessage className="text-#B30000"/>
        </FormItem>
      )}
    />
  );
};

export default Name;
