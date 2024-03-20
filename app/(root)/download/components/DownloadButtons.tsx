'use client'
//@ts-ignore
import HTMLtoDOCX from "html-to-docx"
import { Button } from '@/components/ui/button'
import { SiMicrosoftword } from "react-icons/si";
import { BsFiletypePdf } from "react-icons/bs";
import { saveAs } from "file-saver"
import { Download } from "lucide-react";


const DownloadButtons = () => {
    const handlePdfDownload = () => {

    }
    const handleWordDownload = async () => {
        // const template = document.getElementById('template1');
        // console.log(template?.outerHTML.toString());
        // const res = await HTMLtoDOCX(template?.outerHTML.toString());
        // await saveAs(res, "example.docx");

    }
    return (
        <div className='flex gap-5 w-full'>
            <Button onClick={ () => globalThis.print()}
                className="w-[18rem] gap-2 flex" >
                {/* <BsFiletypePdf className='text-xl mr-2' /> */}
                Download
                <Download />
            </Button>
            {/* <Button onClick={handleWordDownload}>
                <SiMicrosoftword className='text-xl mr-2' />
                Download Word
            </Button> */}
        </div>
    )
}

export default DownloadButtons