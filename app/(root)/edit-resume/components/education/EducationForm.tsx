"use client";
import { Form } from "@/components/ui/form";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setEducation } from "@/redux/slice/userSlice";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useParams, useRouter } from "next/navigation";
import { PlusCircle, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { setFormComp, setValidatedOptions } from "@/redux/slice/commonSlice";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SchoolName from "@/app/(root)/builder/(routes)/education/components/formFields/SchoolName";
import Degree from "@/app/(root)/builder/(routes)/education/components/formFields/Degree";
import Speciality from "@/app/(root)/builder/(routes)/education/components/formFields/Speciality";
import StartDate from "@/app/(root)/builder/(routes)/education/components/formFields/StartDate";
import EndDate from "@/app/(root)/builder/(routes)/education/components/formFields/EndDate";
import { parseISO } from "date-fns";
import CheckboxPursuing from "./components/CheckboxPursuing";

const EducationForm = () => {
  const [expanded, setExpanded] = useState<string | false>("");
  const showSidebarOptions = useAppSelector(
    (state) => state.commonSlice.showSidebarOptions
  );
  const dispatch = useAppDispatch();
  const education = useAppSelector((state) => state.persistedReducer.education);
  const formSchema = z.object({
    education: z
      .object({
        id: z.string(),
        schoolName: z.string({
          required_error: "School name is required",
          invalid_type_error: "Invalid string",
        }),
        degree: z.string({
          required_error: "Degree is required",
          invalid_type_error: "Invalid string",
        }),
        speciality: z.string({
          required_error: "Speciality is required",
          invalid_type_error: "Invalid string",
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
            }
          ),
        endDate: z.any().optional(),
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
        }
      )
      .array(),
  });

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      education: education || [
        {
          schoolName: "",
          degree: "",
          speciality: "",
          startDate: "",
          endDate: "",
          checkboxPursuing: false,
          id: Math.floor(Math.random() * 100).toString(),
          // schoolLocation: '',
          // percentage: 0
        },
      ],
    },
  });

  const fieldArray = useFieldArray({
    name: "education",
    control: form.control,
  });
  const watchFieldsArray = form.watch("education");

  const controlledFields = fieldArray.fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldsArray[index],
    };
  });

  const onSubmit = () => {
    dispatch(
      setValidatedOptions({
        name: "Education",
        isValidated: true,
        index: 0,
      })
    );
    if (!showSidebarOptions) {
      router.push("/download");
    } else {
      dispatch(setFormComp("Social Links"));
    }
    // dispatch(setFormComp("Social Links"));
  };
  const handleChange = () => {
    const education = form.getValues().education;

    const parsedEducation = education.map((item) => {
      return {
        schoolName: item.schoolName,
        degree: item.degree,
        startDate: item.startDate,
        endDate: item.endDate,
        id: item.id,
        speciality: item.speciality,
        checkboxPursuing: item.checkboxPursuing,
      };
    });

    dispatch(setEducation(parsedEducation));
  };
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
    } = form.getValues().education[currIndex];

    if (
      schoolName.trim() === "" ||
      degree.trim() === "" ||
      startDate.trim() === "" ||
      speciality.trim() === "" ||
      (endDate.trim() === "" && checkboxPursuing === false)
    ) {
      toast.error(`Complete previous form first`);
    } else {
      const emptyField = {
        schoolName: "",
        degree: "",
        speciality: "",
        startDate: "",
        endDate: "",
        id: Math.floor(Math.random() * 100).toString(),
        checkboxPursuing: false,
      };
      fieldArray.append(emptyField);
    }
  };

  const handleCollapsible = (id: string, isExpanded: boolean) => {
    if (isExpanded) {
      setExpanded(false);
    } else {
      setExpanded(id);
    }
  };

  const handleDelete = (index: number) => {
    if (controlledFields.length > 0) {
      fieldArray.remove(index);
    }
  };
  useEffect(() => {
    setExpanded(controlledFields[0]?.id);
  }, []);

  useEffect(() => {
    //handling add more functionality
    if (!education || education.length < controlledFields.length) {
      dispatch(setEducation(controlledFields));
      const expandedFieldIndex = controlledFields.length - 1;
      setExpanded(controlledFields[expandedFieldIndex].id);
    }
    //handling delete collapsible
    else if (education && education.length > controlledFields.length) {
      if (controlledFields.length > 0) {
        dispatch(setEducation(controlledFields));
      } else {
        toast.error("Profile should have at least one education field");
      }
    }
  }, [controlledFields.length]);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <motion.div
      animate={{ x: 1, opacity: [0, 1] }}
      initial={{ x: -150, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="pt-10 pb-20 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} onChange={handleChange}>
            <div className="flex flex-col gap-10 w-full">
              {(!education ? controlledFields : education)?.map(
                (item, index) => {
                  return (
                    <>
                      <Collapsible
                        onOpenChange={() =>
                          handleCollapsible(item.id, item.id === expanded)
                        }
                        className="space-y-2 transition"
                        open={item.id === expanded}
                      >
                        <div className="flex transition text-neutral-100 hover:bg-red-300 items-center bg-red-400 px-5">
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full hover:bg-red-300"
                            >
                              {education?.[index]?.schoolName || "University"}
                            </Button>
                          </CollapsibleTrigger>
                          <Trash
                            className="ml-auto cursor-pointer text-neutral-200"
                            onClick={() => handleDelete(index)}
                          />
                        </div>
                        <CollapsibleContent
                          key={item.id}
                          className={`flex
                                                     flex-col
                                                      gap-5
                                                       border 
                                                       p-5 
                                                       transition-transform 
                                                       data-[state=open]:animate-accordion-down 
                                                       `}
                        >
                          <SchoolName form={form} index={index} />
                          <Degree form={form} index={index} />

                          <Speciality form={form} index={index} />

                          <div className="flex gap-2">
                            <StartDate
                              form={form}
                              index={index}
                              handleChange={handleChange}
                            />

                            <EndDate
                              form={form}
                              index={index}
                              handleChange={handleChange}
                            />
                          </div>

                          <CheckboxPursuing
                            form={form}
                            index={index}
                            handleChange={handleChange}
                          />
                        </CollapsibleContent>
                      </Collapsible>
                    </>
                  );
                }
              )}

              <div className="flex gap-5">
                <Button
                  type="button"
                  onClick={handleAddMore}
                  className="w-40 flex gap-2"
                  variant="ghost"
                >
                  <PlusCircle />
                  Add More
                </Button>
                <Button className="w-40" type="submit">
                  {showSidebarOptions ? "Next" : "Submit"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
};

export default EducationForm;
