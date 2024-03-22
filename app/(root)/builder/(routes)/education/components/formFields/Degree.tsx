import React, { FC } from "react";
import { IeducationForm } from "../EducationForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Degree: FC<IeducationForm> = ({ form, index }) => {
  return (
    <FormField
      defaultValue="Bachelor in Technology"
      name={`education.${index}.degree`}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Degree/Program</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue="Bachelor in Technology"
          >
            <FormControl>
              <SelectTrigger className="bg-white h-14 rounded-sm">
                <SelectValue placeholder="Bachelor in Technology" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Bachelor in Technology">
                Bachelor in Technology
              </SelectItem>
              <SelectItem value="Bachelor in Science">
                Bachelor in Science
              </SelectItem>
              <SelectItem value="Bachelor in Computer applications">
                Bachelor in Computer applications
              </SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default Degree;
