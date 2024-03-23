import { IForm } from "@/app/(root)/builder/(routes)/personal/components/PersonalForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { FC } from "react";

const City: FC<IForm> = ({ form }) => {
  return (
    <FormField
      name="city"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>City</FormLabel>
          <FormControl>
            <Input className="bg-white" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default City;
