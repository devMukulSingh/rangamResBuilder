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
  const {
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <FormField
      name="profession"
      control={control}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel>Desired job title</FormLabel>
          <FormControl>
            <Input
              disabled={isSubmitting}
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
