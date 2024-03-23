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


const Address: FC<IForm> = ({ form }) => {
  return (
    <FormField
      name="address"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Address</FormLabel>
          <FormControl>
            <Input className="bg-white" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Address;
