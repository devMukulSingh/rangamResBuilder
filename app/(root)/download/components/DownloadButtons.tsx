'use client'
//@ts-ignore
import { Button } from '@/components/ui/button'
import { Download } from "lucide-react";


const DownloadButtons = () => {
    const handlePdfDownload = () => {

    }

    return (
        <div className='flex gap-5 w-full'>
            <Button onClick={ () => globalThis.print()}
                className="w-[18rem] gap-2 flex" >
                Download
                <Download />
            </Button>

        </div>
    )
}

export default DownloadButtons