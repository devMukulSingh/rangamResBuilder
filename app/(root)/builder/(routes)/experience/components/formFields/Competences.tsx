import { FormControl, FormField, FormItem } from "@/components/ui/form";
import React, { FC, useCallback, useState } from "react";
import { IExperienceForm } from "../ExperienceForm";
import { Plus } from "lucide-react";
import Competence from "./Competence";
import CompetenceSkeleton from "../CompetenceSkeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setCompLoading } from "@/redux/slice/commonSlice";
import axios from "axios";
import RichTextEditor from "@/components/commons/RichTextEditor";
import { setDescription } from "@/redux/slice/userSlice";
import { Editor } from "@tinymce/tinymce-react";
import { Iexperience } from "@/lib/types";
import { ControllerRenderProps } from "react-hook-form";

type Tfield = ControllerRenderProps<
  {
    experience: Iexperience[];
  },
  `experience.${number}.competences`
>;

const Competences: FC<IExperienceForm> = ({ form, index }) => {
  
    const {
    control,
    formState: { isSubmitting },
    getValues,
    setValue
  } = form;
  const dispatch = useAppDispatch();
  const jobTitle = getValues().experience[index].jobTitle;

  const handleLoadMore = async () => {
    try {
      dispatch(setCompLoading(true));
      const { data } = await axios.get("/api/ai/get-competences", {
        params: {
          jobTitle,
        },
      });
      const prevCompetences = getValues(`experience.${index}.competences`);
      setValue(`experience.${index}.competences`, [
        ...prevCompetences,
        ...data,
      ]);
    } catch (e) {
      console.log(`Error in getCompetences ${e}`);
    } finally {
      dispatch(setCompLoading(false));
    }
  };
  const isLoading = useAppSelector(
    (state) => state.commonSlice.competenceLoading,
  );

  if (isLoading) return <CompetenceSkeleton />;

  return (
    <FormField
      name={`experience.${index}.competences`}
      control={control}
      render={({ field }) => (
        <>
          {field.value.length <= 1 && <CompetenceSkeleton />}
          <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-5">
            {field.value?.map((competence, i) => (
              <FormItem key={i}>
                <FormControl>
                  <Competence
                    onChange={field.onChange}
                    form={form}
                    index={index}
                    competence={competence}
                    competenceIndex={i}
                  />
                </FormControl>
              </FormItem>
            ))}
          </div>
          <div
            onClick={handleLoadMore}
            className={`
            w-fit
            flex
            items-center
            gap-2
            col-span-2
            cursor-pointer
             ${getValues().experience[index].competences[0]?.name === "" ? "hidden" : ""}
            ${getValues().experience[index].competences.length === 14 ? "hidden" : ""}
            `}
          >
            <Plus color="#004878" />
            <h1
              className={`
              text-[#004878]
              `}
            >
              Load More key responsibility
            </h1>
          </div>
        </>
      )}
    />
  );
};

export default Competences;
