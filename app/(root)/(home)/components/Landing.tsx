import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const Landing = () => {
  return (
    // <motion.div
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: [0, 1], scale: [0.9, 1] }}
    //   transition={{ duration: 0.4 }}
    // >
    <div className="px-5  w-full md:px-10 lg:px-20 flex flex-col justify-center gap-20 py-10 md:flex-row">
      <div className='flex flex-col gap-5 w-2/3'>
        <h1 className='text-4xl font-bold'>Hi Candidate,</h1>
        <h1 className='text-xl'>RANGAM will help you build an AI-enabled resume to allow employers contact you easily.</h1>
        <h1 className="text-xl mt-5">Experience how our AI technology can swiftly evaluate your background and generate a professional resume in just 10 minutes.  Your resume is crucial - make it stand out.</h1>
        <Link href={'/steps'}>
          <Button
            className='px-5 py-2 w-52 mt-14 text-white rounded-md bg-red-400'>
            Get Started
          </Button>
        </Link>
      </div>

      <figure className="
      relative
      w-[20rem]
      h-[20rem]
      mt-20
      ">
        <Image
          fill
          className=""
          src={'/CV.png'}
          alt="landingImg" />
      </figure>
    </div>
    // </motion.div>
  )
}

export default Landing