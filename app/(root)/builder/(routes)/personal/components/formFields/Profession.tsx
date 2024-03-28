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

const Profession: FC<IForm> = ({ form }) => {
  return (
    <FormField
      name="profession"
      control={form.control}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel>Desired job title</FormLabel>
          <FormControl>
            <Input
              className="bg-white "
              {...field}
              placeholder="Specify your desired job title"
            />
          </FormControl>
          <FormMessage className="text-#B30000" />
        </FormItem>
      )}
    />
  );
};

export default Profession;
