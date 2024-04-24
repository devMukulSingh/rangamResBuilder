"use client";
import { Form } from "@/components/ui/form";
import {
  useFieldArray,
  useForm,
  UseFormReturn,
  FieldValues,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { setExperience } from "@/redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import { Iexperience } from "@/lib/types";
import Competences from "./formFields/Competences";
import CompanyName from "./formFields/CompanyName";
import JobTitle from "./formFields/JobTitle";
import CheckboxInternship from "./formFields/CheckboxInternship";
import CheckboxVolunteering from "./formFields/CheckboxVolunteering";
import CheckboxWorkingStatus from "./formFields/CheckboxWorkingStatus";
import EndDate from "./formFields/EndDate";
import StartDate from "./formFields/StartDate";
import { useRouter } from "next/navigation";
import Buttons from "./Buttons";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import useSWR, { useSWRConfig } from "swr";
import dynamic from "next/dynamic";
const Description = dynamic(() => import("./formFields/Description"),{

})

export interface IExperienceForm {
  form: UseFormReturn<
    {
      experience: Iexperience[];
    },
    any,
    undefined
  >;
  index: number;
  controlledFields?: Iexperience[];
  handleChange?: () => void;
}
const ExperienceForm = () => {

  const router = useRouter();
  const [selected, setSelected] = useState<string | false>("");
  const dispatch = useAppDispatch();
  const isFetchingCompetenceDescription = useIsFetching({
    queryKey: ["compDescription"],
  });

  const experience =
    useAppSelector((state) => state.persistedReducer.experience) || [];

  const form = useForm({
    defaultValues: {
      experience:
        experience.length !== 0
          ? experience
          : [
              {
                companyName: "",
                endDate: "",
                startDate: "",
                jobTitle: "",
                id: Math.floor(Math.random() * 100).toString(),
                checkboxWorkingStatus: false,
                checkboxVolunteering: false,
                checkboxInternship: false,
                competences: [
                  {
                    id: 0,
                    name: "",
                    isSelected: false,
                    description: "",
                  },
                ],
                description: "",
              },
            ],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    watch,
    getValues,
  } = form;

  const fieldArray = useFieldArray({
    name: "experience",
    control,
  });

  const watchFieldsArray = watch("experience");

  const controlledFields =
    fieldArray.fields.map((field, index) => {
      return {
        ...field,
        ...watchFieldsArray[index],
      };
    }) || [];

  const onSubmit = (data: FieldValues) => {
    router.push("/builder/prosummary");
    dispatch(setExperience(data.experience));
  };

  const handleAddMore = () => {
    if (controlledFields.length > 3) {
      toast.error(`Maximum 4 experiences allowed`);
      return;
    }
    const currIndex = controlledFields.length - 1;
    const { companyName, startDate, jobTitle, endDate, checkboxWorkingStatus } =
      getValues().experience[currIndex];
    if (
      companyName.trim() === "" ||
      !startDate ||
      jobTitle.trim() === "" ||
      (!endDate && checkboxWorkingStatus === false)
    ) {
      toast.error("Complete previous form first");
    } else {
      fieldArray.append({
        companyName: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        checkboxWorkingStatus: false,
        checkboxVolunteering: false,
        checkboxInternship: false,
        competences: [
          {
            name: "",
            isSelected: false,
            id: 0,
            description: "",
          },
        ],
        id: Math.floor(Math.random() * 100).toString(),
        description: "",
      });
    }
  };

  const handleDelete = (index: number) => {
    if (controlledFields.length > 1) {
      fieldArray.remove(index);
    } else {
      toast.error("Profile should have at least one experience field");
    }
  };

  useEffect(() => {
    router.prefetch("/builder/prosummary");
    setSelected(controlledFields[0]?.id);
  }, []);

  useEffect(() => {
    //handling add more functionality
    if (!experience || experience.length < controlledFields.length) {
      dispatch(setExperience(controlledFields));
      const selectedFieldIndex = controlledFields.length - 1;
      setSelected(controlledFields[selectedFieldIndex].id);
    }
    //handling delete collapsible
    else if (experience && experience.length > controlledFields.length) {
      if (controlledFields.length > 0) {
        dispatch(setExperience(controlledFields));
        const selectedFieldIndex = controlledFields.length - 1;
        setSelected(controlledFields[selectedFieldIndex].id);
      }
    }
  }, [controlledFields.length]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col ">
          <div className="flex overflow-auto hidden-scrollbar">
            {controlledFields.map((item, index) => (
              <Button
                disabled={isFetchingCompetenceDescription === 0 ? false : true}
                type="button"
                key={index}
                onClick={() => setSelected(item.id)}
                className={`
                                        ${
                                          selected === item.id
                                            ? "text-neutral-500 bg-red-100 hover:bg-red-100"
                                            : "bg-red-400 hover:bg-red-300"
                                        }
                                        rounded-none
                                        border-r-2
                                        flex 
                                        h-12
                                        min-w-48
                                        items-center 
                                        px-5`}
              >
                {item?.companyName || "Company"}
                <X
                  className="cursor-pointer ml-auto hover:bg-neutral-400 rounded-full"
                  onClick={() => handleDelete(index)}
                />
              </Button>
            ))}
            <Button
              type="button"
              onClick={() => handleAddMore()}
              className="flex 
                                        gap-2
                                        h-12
                                        rounded-none
                                        w-48
                                        hover:bg-red-300 
                                        items-center 
                                        bg-red-400 px-5"
            >
              Add More
              <Plus />
            </Button>
          </div>
          {(controlledFields.length === 0 ? experience : controlledFields)?.map(
            (item, index) => {
              return (
                <>
                  {item.id === selected && (
                    <div
                      className=" bg-red-100 py-5 px-5 sm:px-10 flex flex-col gap-5 "
                      key={index}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full">
                        <CompanyName index={index} form={form} />

                        <JobTitle index={index} form={form} />

                        <div className="flex flex-col gap-2 mt-auto text-black">
                          <CheckboxInternship
                            index={index}
                            form={form}
                            controlledFields={controlledFields}
                          />
                          <CheckboxVolunteering
                            index={index}
                            form={form}
                            controlledFields={controlledFields}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        <div className="flex gap-2 sm:gap-5 lg:gap-1 col-span-2 lg:col-span-1 ">
                          <StartDate
                            index={index}
                            form={form}
                            controlledFields={controlledFields}
                          />

                          <EndDate
                            index={index}
                            form={form}
                            controlledFields={controlledFields}
                          />
                        </div>

                        <CheckboxWorkingStatus
                          index={index}
                          form={form}
                          controlledFields={controlledFields}
                        />
                      </div>

                      <h1 className="text-xl sm:text-2xl text-black my-5">
                        {getValues().experience[index].jobTitle === ""
                          ? `Enter the Job title to generate key responsibilities`
                          : `Great! To highlight your experience and describe it
                        properly, please choose the key responsibilities at this
                        workplace.`}
                      </h1>

                      <Competences index={index} form={form} />

                      <Description index={index} form={form} />
                    </div>
                  )}
                </>
              );
            },
          )}

          <Buttons isSubmitting={isSubmitting} />
        </div>
      </form>
    </Form>
  );
};

export default ExperienceForm;
