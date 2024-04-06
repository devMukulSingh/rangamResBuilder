import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { UseFormReturn } from "react-hook-form";
import { Iexperience } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios, { Axios } from "axios";
import { setAiSuggestedCompDesc, setExperience } from "@/redux/slice/userSlice";
import { setCompDescLoading } from "@/redux/slice/commonSlice";
import { useState } from "react";

interface competenceProps {
  competence: {
    name: string;
    isSelected: boolean;
    id: number;
    description: string;
  };
  index: number;
  form: UseFormReturn<
    {
      experience: Iexperience[];
    },
    any,
    undefined
  >;
  competenceIndex: number;
  onChange: () => void;
}

const Competence: React.FC<competenceProps> = ({
  competence,
  index,
  form,
  competenceIndex,
  onChange,
}) => {
  const {
    control,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = form;

  const profession = useAppSelector(
    (state) => state.persistedReducer.personalInfo.profession,
  );

  const { data, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["compDescription"],
    enabled: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data } = await axios.get(`/api/ai/get-compdescription`, {
        params: {
          competence: competence.name,
          profession,
        },
      });
      let previousDescription = getValues(
        `experience.${index}.description`,
      ).replace("<br>", "");

      //description to be added in bullet points, feature
      let descriptionString = "";
      if (previousDescription === "") {
        descriptionString = `<ul><li>${data}</li></ul>`;
      } else {
        const withoutUlTag = previousDescription.replace("</ul>", "");
        descriptionString = `${withoutUlTag}<li>${data}</li>`;
      }
      //setting value of the description field
      setValue(`experience.${index}.description`, descriptionString);
      setValue(`experience.${index}.competences.${competenceIndex}`, {
        description: data,
        isSelected: competence.isSelected,
        name: competence.name,
        id: competence.id,
      });
      return data;
    },
  });
  if (isError) {
    console.log(`Error in getCompetence Description ${error}`);
  }

  const handleSelect = () => {
    if (competence.isSelected) {
      const descriptionToRemove = competence.description;
      const filteredString = form
        .getValues()
        .experience[index].description.replace(`${descriptionToRemove}`, "")
        .replace("<br>", "");

      setValue(`experience.${index}.description`, filteredString);
      setValue(
        `experience.${index}.competences.${competenceIndex}.isSelected`,
        false,
      );
    } else {
      setValue(
        `experience.${index}.competences.${competenceIndex}.isSelected`,
        true,
      );
      refetch();
    }
  };
  if (competence?.name === "") return null;
  return (
    <>
      <div
        aria-disabled={isSubmitting}
        onClick={handleSelect}
        className={`py-5
        ${isSubmitting || isFetching ? "pointer-events-none opacity-55" : ""}                
        transition
                        px-3
                        h-16
                        w-full
                        flex 
                        items-center
                          rounded-sm
                          shadow-md
                           cursor-pointer
                            ${
                              competence.isSelected
                                ? "border-2 border-white bg-gray-400 transition scale-90 text-neutral-100"
                                : " bg-white text-black"
                            } 
                            `}
      >
        <h1 className="text-sm ">{competence.name}</h1>
      </div>
    </>
  );
};

export default Competence;
