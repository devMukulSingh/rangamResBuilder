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
  const {
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <FormField
      name="email"
      control={control}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel>Email Address</FormLabel>
          <FormControl>
            <Input
              type="email"
              disabled={isSubmitting}
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
