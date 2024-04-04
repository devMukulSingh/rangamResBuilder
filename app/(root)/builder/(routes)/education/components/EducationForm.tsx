"use client";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setEducation } from "@/redux/slice/userSlice";
import { useEffect, useState } from "react";
import { Ieducation } from "@/lib/types";
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
import LinkComp from "@/components/ui/LinkComp";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseISO } from "date-fns";

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

const EducationForm = () => {
  const [selected, setSelected] = useState<string>("");
  const dispatch = useAppDispatch();
  const education = useAppSelector((state) => state.persistedReducer.education);
  const router = useRouter();
  const schema = z.object({
    education: z
      .object({
        id: z.string(),
        schoolName: z
          .string({
            required_error: "School name is required",
            invalid_type_error: "Invalid string",
          })
          .trim()
          .min(1, {
            message: "School name is required",
          }),
        degree: z
          .string({
            required_error: "Degree is required",
            invalid_type_error: "Invalid string",
          })
          .trim()
          .min(1, {
            message: "Degree is required",
          }),
        speciality: z
          .string({
            required_error: "Speciality is required",
            invalid_type_error: "Invalid string",
          })
          .trim()
          .min(1, {
            message: "Specialiy is required",
          }),
        startDate: z
          .any({
            required_error: "Start date is required",
          })
          .refine(
            (data) => {
              if (data) return true;
            },
            {
              message: "Start date is required",
            },
          ),
        endDate: z
          .any()
          .optional()
          .refine(
            (data) => {
              if (data) return true;
            },
            {
              message: "End date is required",
            },
          ),
        checkboxPursuing: z.boolean(),
      })
      .refine(
        (data) => {
          let startDate = data.startDate;
          let endDate = data?.endDate;
          if (typeof startDate === "string") {
            startDate = parseISO(startDate);
          }
          if (endDate && typeof endDate === "string") {
            endDate = parseISO(endDate);
          }
          if (
            data.checkboxPursuing ||
            startDate < endDate ||
            !startDate ||
            !endDate
          )
            return true;
        },
        {
          message: `End date must be greater than start date`,
          path: ["endDate"],
        },
      )
      .array()
      .min(1, {
        message: "1 is required",
      }),
  });
  type formSchema = z.infer<typeof schema>;

  const form = useForm<formSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      education: education || [
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
      schoolName === "" ||
      degree === "" ||
      startDate === "" ||
      speciality === "" ||
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
  const onSubmit = (data: FieldValues) => {
    console.log(data);

    router.push("/download");
    dispatch(setEducation(data.education));
  };
  useEffect(() => {
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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    // <motion.div
    //     animate={{ x: 1, opacity: [0, 1] }}
    //     initial={{ x: -150, opacity: 0 }}
    //     transition={{ duration: 0.2 }}
    // >
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <div className="flex">
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
                                        w-48
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

            <div className="mt-auto flex justify-between">
              <LinkComp
                disabled={isSubmitting}
                className="w-40 bg-gray-400 text-[#000] hover:bg-gray-300"
                href={"/builder/prosummary"}
              >
                Back
              </LinkComp>
              <Button
                type="submit"
                className="flex gap-2 w-40"
                disabled={isSubmitting}
              >
                Next
                {isSubmitting && <Loader className="animate-spin" />}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
    // </motion.div>
  );
};

export default EducationForm;
