import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { FC } from "react";
import { IExperienceForm } from "../ExperienceForm";
import RichTextEditor from "@/components/commons/RichTextEditor";

const Description: FC<IExperienceForm> = ({ form, index }) => {
  return (
    <FormField
      name={`experience.${index}.description`}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <RichTextEditor
              onChange={(content) => field.onChange(content)}
              value={field.value}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Description;
