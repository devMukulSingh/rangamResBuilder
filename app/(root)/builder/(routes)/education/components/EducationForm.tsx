"use client";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  setEducation,
  setUserId,
} from "@/redux/slice/userSlice";
import { useEffect, useState } from "react";
import {
  FieldValues,
  useFieldArray,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { Loader, Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import SchoolName from "./formFields/SchoolName";
import Speciality from "./formFields/Speciality";
import StartDate from "./formFields/StartDate";
import EndDate from "./formFields/EndDate";
import Degree from "./formFields/Degree";
import CheckboxPursuing from "./formFields/CheckboxPursuing";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import useSWRMutation from "swr/mutation";
import { educationSchema } from "@/lib/schema/formSchemas";
import Buttons from "./Buttons";

export interface IeducationForm {
  handleChange?: () => void;
  form: UseFormReturn<
    {
      education: {
        startDate?: any;
        id: string;
        schoolName: string;
        degree: string;
        speciality: string;
        checkboxPursuing: boolean;
        endDate?: any | undefined;
      }[];
    },
    any,
    undefined
  >;
  index: number;
}
type formFieldValues = z.infer<typeof educationSchema>;
export async function setResumeData(
  url: string,
  { arg }: { arg: formFieldValues },
) {
  return await axios.post(url, arg);
}

const EducationForm = () => {
  const resumeData = useAppSelector((state) => state.persistedReducer);
  const { trigger, isMutating, error } = useSWRMutation(
    `/api/user/set-resumedata`,
    setResumeData,
    {
      onSuccess(data) {
        dispatch(setUserId(data.data.id));
      },
    },
  );
  const [selected, setSelected] = useState<string>("");
  const education = useAppSelector((state) => state.persistedReducer.education);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm<formFieldValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education:
        education.length !== 0
          ? education
          : [
              {
                schoolName: "",
                degree: "",
                speciality: "",
                startDate: "",
                endDate: "",
                id: Math.floor(Math.random() * 100).toString(),
                checkboxPursuing: false,
              },
            ],
    },
  });

  const {
    control,
    formState: { isSubmitting, isValidating },
    watch,
    handleSubmit,
    getValues,
  } = form;

  const fieldArray = useFieldArray({
    name: "education",
    control: control,
  });
  const watchFieldsArray = watch("education");

  const controlledFields = fieldArray.fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldsArray[index],
    };
  });

  const handleAddMore = () => {
    if (controlledFields.length > 2) {
      toast.error(`Maximum 3 education allowed`);
      return;
    }
    const currIndex = controlledFields.length - 1;
    const {
      schoolName,
      speciality,
      degree,
      startDate,
      checkboxPursuing,
      endDate,
    } = getValues().education[currIndex];

    if (
      schoolName.trim() === "" ||
      degree.trim() === "" ||
      startDate === "" ||
      speciality.trim() === "" ||
      (endDate === "" && checkboxPursuing === false)
    ) {
      toast.error("Complete previous form first");
    } else {
      const emptyField = {
        schoolName: "",
        degree: "",
        speciality: "",
        startDate: "",
        endDate: "",
        checkboxPursuing: false,
        id: Math.floor(Math.random() * 100).toString(),
      };
      fieldArray.append(emptyField);
    }
  };

  const handleDelete = (index: number) => {
    if (controlledFields.length > 1) {
      fieldArray.remove(index);
    }
  };
  const onSubmit = async (data: formFieldValues) => {
    dispatch(setEducation(data.education));
    try {
      await trigger({
        ...resumeData,
        education: data.education,
      });
    } catch (e) {
      console.log(`Error in onSubmit POST resumedata req ${e}`);
    } finally {
      router.push("/download");
    }
  };
  useEffect(() => {
    router.prefetch("/download");
    setSelected(controlledFields[0]?.id);
  }, []);

  useEffect(() => {
    //handling add more functionality
    if (!education || education.length < controlledFields.length) {
      dispatch(setEducation(controlledFields));
      const expandedFieldIndex = controlledFields.length - 1;
      setSelected(controlledFields[expandedFieldIndex].id);
    }
    //handling delete collapsible
    else if (education && education.length > controlledFields.length) {
      if (controlledFields.length > 0) {
        dispatch(setEducation(controlledFields));
        const expandedFieldIndex = controlledFields.length - 1;

        setSelected(controlledFields[expandedFieldIndex].id);
      } else {
        toast.error("Profile should have at least one education field");
      }
    }
  }, [controlledFields.length]);
  if (error) {
    console.log(`Error in post user data ${error}`);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <div className="flex overflow-auto hidden-scrollbar ">
              {controlledFields.map((item, index) => (
                <Button
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
                  {item?.schoolName || "School"}
                  <X
                    className="cursor-pointer ml-auto hover:bg-neutral-400 rounded-full"
                    onClick={() => handleDelete(index)}
                  />
                </Button>
              ))}
              <Button
                onClick={handleAddMore}
                type="button"
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

            {(controlledFields.length === 0
              ? education
              : controlledFields
            )?.map((item, index) => {
              return (
                <>
                  {item.id === selected && (
                    <div
                      className="py-5 px-10  bg-red-100 grid grid-cols-1 md:grid-cols-2 gap-5 text-neutral-500"
                      key={index}
                    >
                      <SchoolName form={form} index={index} />

                      <Degree form={form} index={index} />

                      <Speciality form={form} index={index} />

                      <div className="flex gap-2">
                        <StartDate form={form} index={index} />
                        <EndDate form={form} index={index} />
                        <CheckboxPursuing form={form} index={index} />
                      </div>
                    </div>
                  )}
                </>
              );
            })}

            <Buttons isMutating={isMutating} isSubmitting={isSubmitting} />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EducationForm;
