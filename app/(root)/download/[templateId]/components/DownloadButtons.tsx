'use client'
//@ts-ignore
import HTMLtoDOCX from "html-to-docx"
import { Button } from '@/components/ui/button'
import { SiMicrosoftword } from "react-icons/si";
import { BsFiletypePdf } from "react-icons/bs";
import { saveAs } from "file-saver"


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
        <main className='flex gap-5'>
            <Button onClick={handlePdfDownload} >
                <BsFiletypePdf className='text-xl mr-2' />
                Download PDF
            </Button>
            <Button onClick={handleWordDownload}>
                <SiMicrosoftword className='text-xl mr-2' />
                Download Word
            </Button>
        </main>
    )
}

export default DownloadButtons