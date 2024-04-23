"use client";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink, usePDF } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import { useAppSelector } from "@/redux/hooks/hooks";

const DownloadButtons = () => {
  const resumeData = useAppSelector((state) => state.persistedReducer);



  const handlePdfDownload = () => {
    // document.addEventListener('p')
    globalThis.print();
  };

  return (
    <div className="flex gap-5 w-full">
      <Button onClick={handlePdfDownload} className="w-[18rem] gap-2 flex">
        Download
        <Download />
      </Button>
      {/* <PDFDownloadLink
        document={<PdfComponent resumeData={resumeData} />}
        fileName="somename.pdf"
      >
        <Button className="w-[18rem] gap-2 flex">
          Download
          <Download />
        </Button>
      </PDFDownloadLink> */}
    </div>
  );
};

export default DownloadButtons;
