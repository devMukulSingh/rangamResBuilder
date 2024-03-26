import { useAppSelector } from "@/redux/hooks/hooks";
import { format } from "date-fns";
import React from "react";

interface EducationSectionProps {}

const EducationSection: React.FC<EducationSectionProps> = ({}) => {
  const education = useAppSelector((state) => state.persistedReducer.education);

  return (
    <section className="space-y-5 p-5 bg-white">
      <h1 className=" text-xl font-semibold">Education</h1>
      {education?.map((educationInfo, index) => (
        <div key={index}>
          <h1 className="">{educationInfo?.schoolName}</h1>
          <div className="flex justify-between">
            <h1>
              {educationInfo?.degree}{" "}
              {`${
                educationInfo?.speciality
                  ? ` in ${educationInfo.speciality}`
                  : ""
              }`}
              {/* {` 
                            ${
                              educationInfo.percentage
                                ? ` - ${educationInfo.percentage} CGPA`
                                : ``
                            } 
                        
                        `} */}
            </h1>
            <h1>
              {`${
                educationInfo?.startDate
                  ? format(educationInfo.startDate, "MMM yyyy")
                  : ""
              } `}
              {`${
                educationInfo?.endDate
                  ? ` - ${format(educationInfo.endDate, "MMM yyyy")}`
                  : ""
              }`}
            </h1>
          </div>
        </div>
      ))}
    </section>
  );
};

export default EducationSection;
