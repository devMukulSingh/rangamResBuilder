import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { FC } from "react";
import { IExperienceForm } from "../ExperienceForm";
import { Editor } from "@tinymce/tinymce-react";

const Description: FC<IExperienceForm> = ({ form, index }) => {
  return (
    <FormField
      name={`experience.${index}.description`}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Editor
              onEditorChange={(a, editor) =>
                field.onChange(editor.getContent())
              }
              value={field.value || ""}
              apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
              init={{
                menubar: false,
                height: 200,
                plugins:['lists'],
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | numlist bullist | removeformat",
                tinycomments_mode: "embedded",
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
