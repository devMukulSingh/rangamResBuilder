import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAppSelector } from "@/redux/hooks/hooks";
import React, { FC } from "react";
import Skill from "./Competence";
import { IExperienceForm } from "../ExperienceForm";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const CheckboxInternship: FC<IExperienceForm> = ({
  form,
  index,
  controlledFields,
}) => {
  const {
    control,
    formState: { isSubmitting },
  } = form;
  return (
    <FormField
      name={`experience.${index}.checkboxInternship`}
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex items-center gap-4">
          <FormControl>
            <Checkbox
              disabled={
                isSubmitting || controlledFields?.[index].checkboxVolunteering
                  ? true
                  : false
              }
              className="size-6 bg-white border"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormLabel>Internship</FormLabel>
        </FormItem>
      )}
    />
  );
};

export default CheckboxInternship;
