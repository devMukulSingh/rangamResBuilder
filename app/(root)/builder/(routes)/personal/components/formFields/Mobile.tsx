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

const Mobile: FC<IForm> = ({ form }) => {
  const {
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <FormField
      name="mobile"
      control={control}
      render={({ field }) => (
        <FormItem className="w-1/2">
          <FormLabel>Mobile</FormLabel>
          <FormControl>
            <Input
              disabled={isSubmitting}
              className="bg-white"
              {...field}
              placeholder="Mobile number"
            />
          </FormControl>
          <FormMessage className="text-#B30000" />
        </FormItem>
      )}
    />
  );
};

export default Mobile;
