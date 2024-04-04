import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { IeducationForm } from "@/app/(root)/builder/(routes)/education/components/EducationForm";
import { FC } from "react";

const CheckboxPursuing: FC<IeducationForm> = ({
  form,
  index,
  handleChange,
}) => {
  const {
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <FormField
      name={`education.${index}.checkboxPursuing`}
      control={control}
      render={({ field }) => (
        <FormItem className="flex gap-2">
          <FormControl>
            <Checkbox
              disabled={isSubmitting}
              className="size-6 bg-white"
              checked={field.value}
              onCheckedChange={(value) => {
                field.onChange(value);
                handleChange&&handleChange();
              }}
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
