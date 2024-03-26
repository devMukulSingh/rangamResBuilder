"use client";
import { HTMLRenderer } from "@/lib/HTMLRenderer";
import { useAppSelector } from "@/redux/hooks/hooks";
import { Mail, Phone } from "lucide-react";
import { FaLinkedin, FaLocationPin } from "react-icons/fa6";

const About = () => {
  const personalInfo = useAppSelector(
    (state) => state.persistedReducer.personalInfo,
  );
  const contact = useAppSelector((state) => state.persistedReducer.contact);

  return (
    <main className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold text-blue-400">
          {personalInfo?.fullName}
        </h1>
        <HTMLRenderer htmlString={personalInfo?.bio} className="text-sm" />
      </div>

      <div className="flex gap-5 ">
        <div>
          <div className="flex items-center gap-1">
            <Mail size={20} />
            {personalInfo?.email || "john@gmail.com"}
          </div>

          {/* <div className='flex items-center gap-2'>
                        <FaLinkedin size={20} />
                        {contact?.linkedIn || 'https://linkedin.com'}
                    </div> */}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <Phone size={20} />
            {personalInfo?.mobile || "9808088888"}
          </div>
          {/* <div className='flex items-center gap-2'>
                        <FaLocationPin size={20} />
                        {personalInfo?.address || 'pune'}
                    </div> */}
        </div>
      </div>
    </main>
  );
};

export default About;
