import { FormControl, FormField, FormItem } from "@/components/ui/form";
import React, { FC, useEffect, useState } from "react";
import { IExperienceForm } from "../ExperienceForm";
import { Plus } from "lucide-react";
import Competence from "../Competence";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CompetenceSkeleton from "../CompetenceSkeleton";

const Competences: FC<IExperienceForm> = ({ form, index }) => {

  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["competences"],
    queryFn: async () => {
      const {data} = await axios.get("/api/ai/get-competences");
      return data;
    },
  });
  if (isLoading) return <CompetenceSkeleton />;
  if (isError) {
    console.log(`Errror in get Competences ${error}`);
    return;
  }
  return (
    <FormField
      name={`experience.${index}.competences`}
      control={form.control}
      render={({ field }) => (
        <div className="grid grid-cols-6 gap-5">
          {data?.map((competence:string, i:number) => (
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
            <Plus color="#EF4444" />
            <h1
              className="
                text-red-500
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
