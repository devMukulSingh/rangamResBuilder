import { FormControl, FormField, FormItem } from "@/components/ui/form";
import React, { FC } from "react";
import { IExperienceForm } from "../ExperienceForm";
import { Plus } from "lucide-react";
import Competence from "./Competence";
import CompetenceSkeleton from "../CompetenceSkeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import axios from "axios";
import { Iexperience } from "@/lib/types";
import { ControllerRenderProps } from "react-hook-form";
import { useIsFetching } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

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
    setValue,
  } = form;
  const dispatch = useAppDispatch();
  const jobTitle = getValues().experience[index].jobTitle;
  const isFetchingCompetenceDescription = useIsFetching({
    queryKey: ["compDescription"],
  });


  const handleLoadMore = async () => {
    try {
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
          <Button
            variant="ghost"
            disabled={isFetchingCompetenceDescription === 0 ? false : true}
            onClick={handleLoadMore}
            className={`
            hover:bg-transparent
            w-fit
            flex
            items-center
            gap-2
            col-span-2
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
          </Button>
        </>
      )}
    />
  );
};

export default Competences;
