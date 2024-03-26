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

const Email: FC<IForm> = ({ form }) => {
  return (
    <FormField
      name="email"
      control={form.control}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Email Address</FormLabel>
          <FormControl>
            <Input
              className="bg-white"
              {...field}
              placeholder="Enter your email address"
            />
          </FormControl>
          <FormMessage className="text-#B30000" />
        </FormItem>
      )}
    />
  );
};

export default Email;
