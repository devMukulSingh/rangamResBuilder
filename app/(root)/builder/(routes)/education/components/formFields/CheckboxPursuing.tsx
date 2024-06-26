import React, { FC } from "react";
import { IeducationForm } from "../EducationForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const CheckboxPursuing: FC<IeducationForm> = ({ form, index }) => {
  const {
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <FormField
      name={`education.${index}.checkboxPursuing`}
      control={control}
      render={({ field }) => (
        <FormItem className="flex mt-16 ml-5 gap-2">
          <FormControl>
            <Checkbox
              disabled={isSubmitting}
              className="size-6 bg-white"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormLabel>Pursuing</FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CheckboxPursuing;
