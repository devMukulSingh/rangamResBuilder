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
  const {
    control,
    formState: { isSubmitting },
  } = form;
  return (
    <FormField
      name="fullName"
      control={control}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel>Full Name</FormLabel>
          <FormControl>
            <Input
              disabled={isSubmitting}
              className="bg-white "
              {...field}
              placeholder="Enter your full name"
            />
          </FormControl>
          <FormMessage className="text-#B30000" />
        </FormItem>
      )}
    />
  );
};

export default Name;
