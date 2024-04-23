import { FormControl, FormField, FormItem } from "@/components/ui/form";
import React, { FC, useState } from "react";
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
import useSWR from "swr";

type Tfield = ControllerRenderProps<
  {
    experience: Iexperience[];
  },
  `experience.${number}.competences`
>;

const Competences: FC<IExperienceForm> = ({ form, index }) => {
  const [isFetching, setIsFetching] = useState(false)
  const {
    control,
    getValues,
    setValue,
  } = form;
  const jobTitle = getValues().experience[index].jobTitle;
  const fetcher = (url:string) => axios.get(url, {
    params: {
          jobTitle,
        }}).then((res) => res.data);
  const { isLoading, error } = useSWR(isFetching ? "/api/ai/get-competences":null,fetcher,{
    revalidateIfStale:false,
    revalidateOnReconnect:false,
    revalidateOnFocus:false,
    onSuccess(data, key, config) {
        const prevCompetences = getValues(`experience.${index}.competences`);
        setValue(`experience.${index}.competences`, [
          ...prevCompetences,
          ...data,
        ]);
    },
 
  });
  const isFetchingCompetenceDescription = useIsFetching({
    queryKey: ["compDescription"],
  });
  const isCompetencesLoading = useAppSelector(
    (state) => state.commonSlice.competenceLoading,
  );
  if (isCompetencesLoading || isLoading) return <CompetenceSkeleton />;
  if(error){
    console.log(`error in getCompetences ${error}`);
  }
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
            type="button"
            variant="ghost"
            disabled={isFetchingCompetenceDescription === 0 ? false : true}
            onClick={() => setIsFetching(true)}
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
