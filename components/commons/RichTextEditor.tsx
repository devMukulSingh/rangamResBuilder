"use client";
import "react-quill/dist/quill.snow.css";
import "./richTextEditor.css";
import dynamic from "next/dynamic";
// import ReactQuill from "react-quill";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

interface RichTextEditorProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const modules = {
    
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  return <ReactQuill value={value} onChange={onChange} modules={modules}  />;
};

export default RichTextEditor;
