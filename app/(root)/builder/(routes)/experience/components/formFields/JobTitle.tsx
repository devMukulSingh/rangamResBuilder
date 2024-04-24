import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAppDispatch } from "@/redux/hooks/hooks";
import React, { FC, useCallback } from "react";
import { IExperienceForm } from "../ExperienceForm";
import { Input } from "@/components/ui/input";
import axios from "axios";
import debounce from "debounce";
import { setCompLoading } from "@/redux/slice/commonSlice";

const JobTitle: FC<IExperienceForm> = ({ form, index }) => {
  const dispatch = useAppDispatch();
  const {
    control,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = form;
  const onChange = () => {
    const jobTitle = getValues().experience[index].jobTitle;
    debouncedRequest(jobTitle);
  };
  const debouncedRequest = useCallback((jobTitle: string) => {
    getCompetences(jobTitle);
  }, []);

  const getCompetences = debounce(async (jobTitle) => {
    try {
      dispatch(setCompLoading(true));
      if (jobTitle.length > 5) {
        const { data } = await axios.get("/api/ai/get-competences", {
          params: {
            jobTitle,
          },
        });
        setValue(`experience.${index}.competences`, data);
      }
    } catch (e) {
      console.log(`Error in getCompetences ${e}`);
    } finally {
      dispatch(setCompLoading(false));
    }
  }, 2000);

  return (
    <FormField
      name={`experience.${index}.jobTitle`}
      control={control}
      render={({ field }) => (
        <FormItem onChange={onChange}>
          <FormLabel>Job title</FormLabel>
          <FormControl>
            <Input
              disabled={isSubmitting}
              placeholder="Job title"
              className="bg-white h-14 rounded-sm"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default JobTitle;
