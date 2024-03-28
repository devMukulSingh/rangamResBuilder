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
import MonthPicker from "@/components/commons/MonthPicker";

const EndDate: FC<IExperienceForm> = ({ form, index, controlledFields }) => {
  return (
    <FormField
      name={`experience.${index}.endDate`}
      control={form.control}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>End Date</FormLabel>
          <FormControl>
            <MonthPicker field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EndDate;
