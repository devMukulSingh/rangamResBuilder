import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { FC } from "react";
import { IExperienceForm } from "../ExperienceForm";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/redux/hooks/hooks";
const RichTextEditor = dynamic(
  () => import("@/components/commons/RichTextEditor"),
  {
    ssr: false,
  }
);

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
              value={ field.value || ""}
              onChange={(content) => {
                field.onChange(content);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Description;
