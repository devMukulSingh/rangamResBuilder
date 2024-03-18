import { ChatGPT } from "@/lib/ChatGPT";
import dynamic from "next/dynamic";
const MainComp = dynamic(() => import('./components/main/MainComp'))


const BuilderPage = async ({
  searchParams
}: { searchParams: { profession: string } }) => {


  return (
    <>
      <MainComp />
    </>
  )
}

export default BuilderPage