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

const BirthPlace: FC<IForm> = ({ form }) => {
  return (
    <FormField
      name="birthPlace"
      control={form.control}
      render={({ field }) => (
        <FormItem className="w-1/2">
          <FormLabel>Birth Place</FormLabel>
          <FormControl>
            <Input className="bg-white" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BirthPlace;
