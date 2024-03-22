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

const JobTitle: FC<IExperienceForm> = ({ form, index }) => {
  return (
    <FormField
      name={`experience.${index}.jobTitle`}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>jobTitle</FormLabel>
          <FormControl>
            <Input
              placeholder="Jr. Frontend Developer"
              className="bg-white h-14 rounded-sm"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default JobTitle;
