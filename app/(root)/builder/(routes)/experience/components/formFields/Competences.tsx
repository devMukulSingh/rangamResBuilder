import { FormControl, FormField, FormItem } from "@/components/ui/form";
import React, { FC, useEffect, useState } from "react";
import { IExperienceForm } from "../ExperienceForm";
import { Plus } from "lucide-react";
import Competence from "./Competence";
import CompetenceSkeleton from "../CompetenceSkeleton";
import { useAppSelector } from "@/redux/hooks/hooks";

const Competences: FC<IExperienceForm> = ({ form, index }) => {
  const aiSuggestedComp = useAppSelector(
    (state) => state.persistedReducer.aiSuggestedComp,
  );

  const isLoading = useAppSelector(
    (state) => state.commonSlice.competenceLoading,
  );

  if (isLoading) return <CompetenceSkeleton />;

  return (
    <FormField
      name={`experience.${index}.competences`}
      control={form.control}
      render={({ field }) => (
        <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-5">
          {aiSuggestedComp?.map((competence: string, i: number) => (
            <FormItem key={i}>
              <FormControl>
                <Competence
                  form={form}
                  index={index}
                  onChange={field.onChange}
                  competence={competence}
                />
              </FormControl>
            </FormItem>
          ))}
          <div
            className="
            flex
            items-center
            gap-2
            col-span-2
            cursor-pointer
        "
          >
            <Plus color="#004878" />
            <h1
              className="
                text-[#004878]
                "
            >
              Load More key responsibility
            </h1>
          </div>
        </div>
      )}
    />
  );
};

export default Competences;
