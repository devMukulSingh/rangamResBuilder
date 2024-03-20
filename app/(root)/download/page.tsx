import React from 'react'
import DownloadSection from './components/DownloadSection'
import Template1 from './components/Template/Template1'

const DownloadPage = ({
  params
}: {
  params: { templateId: string }
}) => {
  const { templateId } = params;
  return (
    <main className='md:flex-row flex flex-col gap-20 md:gap-10 w-full h-full py-10 px-5'>
      <DownloadSection templateId={templateId} />
      <Template1 />
    </main>
  )
}

export default DownloadPage