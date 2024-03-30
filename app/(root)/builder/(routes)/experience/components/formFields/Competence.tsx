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
  };
  onChange: (competences: string[]) => void;
  index: number;
  form: UseFormReturn<
    {
      experience: Iexperience[];
    },
    any,
    undefined
  >;
  competenceIndex: number;
}

const Competence: React.FC<competenceProps> = ({
  competence,
  onChange,
  index,
  form,
  competenceIndex,
}) => {
  const dispatch = useAppDispatch();
  const competences = form.getValues().experience[index].competences;
  const profession = useAppSelector(
    (state) => state.persistedReducer.personalInfo.profession,
  );

  const { isLoading, data, isError, error, refetch } = useQuery({
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
      dispatch(setCompDescLoading(isLoading));
      const previousDescription = form.getValues(
        `experience.${index}.description`,
      );
      const descriptionString = previousDescription.concat(data);
      form.setValue(`experience.${index}.description`, descriptionString);
      return data;
    },
  });
  if (isError) {
    console.log(`Error in getCompetence Description ${error}`);
  }
  const handleSelect = () => {
    if (competence.isSelected) {
      form.setValue(
        `experience.${index}.competences.${competenceIndex}.isSelected`,
        false,
      );
    } else {
      form.setValue(
        `experience.${index}.competences.${competenceIndex}.isSelected`,
        true,
      );
      refetch();
    }
  };

  if (Object.keys(competence).length === 0) return null;

  return (
    <>
      <div
        onClick={handleSelect}
        className={`py-5
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
