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

const DOB: FC<IForm> = ({ form }) => {
  return (
    <FormField
      name="dob"
      control={form.control}
      render={({ field }) => (
        <FormItem className="w-1/2">
          <FormLabel>Date of Birth</FormLabel>
          <FormControl>
            <Input className="bg-white " {...field} type="date" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DOB;
