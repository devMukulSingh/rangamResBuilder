'use client';

import ReactQuill from "react-quill";

interface RichTextEditorProps {
    value: string | undefined,
    onChange: (value: string) => void,

}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    value,
    onChange
}) => {

    const modules = {
        toolbar: [
            ["bold", "italic", "underline", "strike"],
            [
                { list: "ordered" },
                { list: "bullet" },
            ]
        ]
    }

    return (
        <>
            <ReactQuill
                value={value}
                onChange={ onChange }
                style={{ height: '8rem', marginBottom: '3rem' }}
                theme="snow"
                modules={modules}
            />
        </>
    )
}

export default RichTextEditor