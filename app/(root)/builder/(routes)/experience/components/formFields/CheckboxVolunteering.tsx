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

const CheckboxVolunteering: FC<IExperienceForm> = ({
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
      name={`experience.${index}.checkboxVolunteering`}
      control={control}
      render={({ field }) => (
        <FormItem className="flex items-center gap-4">
          <FormControl>
            <Checkbox
              disabled={
                isSubmitting || controlledFields?.[index].checkboxInternship
                  ? true
                  : false
              }
              className="size-6 bg-white"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormLabel>Volunteering</FormLabel>
        </FormItem>
      )}
    />
  );
};

export default CheckboxVolunteering;
