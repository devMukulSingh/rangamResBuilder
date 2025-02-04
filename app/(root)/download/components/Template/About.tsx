"use client";
import { HTMLRenderer } from "@/components/commons/HTMLRenderer";
import { useAppSelector } from "@/redux/hooks/hooks";
import { Mail, Phone } from "lucide-react";
import { FaLinkedin, FaLocationPin } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
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
        <HTMLRenderer htmlString={personalInfo?.bio} className="" />
      </div>

      <div className="flex gap-5 ">
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Mail size={20} />
            {personalInfo?.email || ""}
          </div>
          <div className="flex items-center gap-1">
            {personalInfo?.city !== "" && personalInfo?.city && (
              <>
                <IoLocationOutline size={25} />
                {personalInfo?.city}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <Phone size={20} />
            {personalInfo?.phone || "9808088888"}
          </div>
          <div className={`flex items-center gap-2`}>
            {contact?.linkedIn !== "" && contact?.linkedIn && (
              <>
                <FaLinkedin size={20} />
                {contact?.linkedIn}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
