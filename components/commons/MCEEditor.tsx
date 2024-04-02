import React, { FC } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface MCEEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: number;
}

const MCEEditor: FC<MCEEditorProps> = ({ value, onChange, height }) => {
  return (
    <Editor
      onEditorChange={(a, editor) => onChange(editor.getContent())}
      value={value || ""}
      apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
      init={{
        menubar: false,
        height,
        plugins: ["lists"],
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | numlist bullist | removeformat",
        tinycomments_mode: "embedded",
      }}
    />
  );
};

export default MCEEditor;
