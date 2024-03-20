import dynamic from 'next/dynamic'
const About = dynamic(() => import('./About'), { ssr: false })
const Experience = dynamic(() => import('./Experience'), { ssr: false });
const Project = dynamic(() => import('./Project'), { ssr: false });
const Education = dynamic(() => import('./Education'), { ssr: false });
const Skills = dynamic(() => import('./Skills'), { ssr: false });


const Template1 = () => {

    return (
        <>
            <div 
                id="template1" 
                className='w-[calc(100vw-53rem)] pb-20 whitespace-nowrap px-5 md:px-10 max-w-[60rem] shrink-0'>

                <div className=' bg-white pb-10  min-w-[40rem] '>
                    <hr className='h-4 bg-blue-400 w-full ' />
                    <div className='flex flex-col gap-5 py-5 px-14  '>
                        {/* <About />
                        <Experience />
                        <Education />
                        <Project />
                        <Skills /> */}
                    </div>
                </div>

            </div>
        </>

    )
}

export default Template1