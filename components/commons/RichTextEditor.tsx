'use client';
import 'react-quill/dist/quill.snow.css';
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

            <ReactQuill
                value={value}
                onChange={onChange}
                style={{
                    marginBottom: '3rem',
                    backgroundColor: 'white',
                    // border: 'none',
                    border:'1px solid white',
                    outline: 'none',
                    minHeight:'10rem'
                }}
                modules={modules}
            />
    )
}

export default RichTextEditor