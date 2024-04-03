"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setEducation } from "@/redux/slice/userSlice";
import { useEffect, useState } from "react";
import { Ieducation } from "@/lib/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useParams, useRouter } from "next/navigation";
import { setProgress } from "@/redux/slice/userSlice";
import { PlusCircle, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { setFormComp } from "@/redux/slice/commonSlice";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import MonthPicker from "@/components/commons/MonthPicker";
import LinkComp from "@/components/ui/LinkComp";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const EducationForm = () => {
  const [expanded, setExpanded] = useState<string | false>("");
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
        startDate: z.string({
          required_error: "Start date is required",
          invalid_type_error: "Invalid date",
        }),
        endDate: z
          .string({
            invalid_type_error: "Invalid date",
          })
          .optional(),
        checkboxPursuing: z.boolean().optional(),
      })
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
          startDate: undefined,
          endDate: undefined,
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
    router.push("/download");
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
    const emptyField = {
      schoolName: "",
      degree: "",
      speciality: "",
      startDate: "",
      endDate: "",
      id: Math.floor(Math.random() * 100).toString(),
      checkboxPursuing: false,
      // schoolLocation: '',
      // percentage: 0,
    };
    fieldArray.append(emptyField);
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
      console.log("else", controlledFields);

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
                          {/* schoolName */}
                          <FormField
                            name={`education.${index}.schoolName`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>School Name</FormLabel>
                                <FormControl>
                                  <Input
                                    className="bg-white"
                                    {...field}
                                    placeholder="School Name"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {/* schoolLocation */}
                          {/* <FormField
                                                    name={`education.${index}.schoolLocation`}
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <FormItem >
                                                            <FormLabel>School Location</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="bg-white" {...field}
                                                                    placeholder="New Delhi" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                /> */}

                          {/* degree */}
                          <FormField
                            name={`education.${index}.degree`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Degree/Program</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Degree name"
                                    className="bg-white"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* speciality */}
                          <FormField
                            name={`education.${index}.speciality`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Specialisation</FormLabel>
                                <FormControl>
                                  <Input
                                    className="bg-white"
                                    {...field}
                                    placeholder=""
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* GPA percentage */}
                          {/* <FormField
                                                    name={`education.${index}.percentage`}
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <FormItem >
                                                            <FormLabel>GPA/Percentage</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="bg-white" {...field}
                                                                    placeholder="88%"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                /> */}

                          {/* startDate */}
                          <FormField
                            name={`education.${index}.startDate`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                  <MonthPicker field={field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* endDate */}
                          <FormField
                            name={`education.${index}.endDate`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem
                                className={`${
                                  form.getValues().education?.[index]
                                    .checkboxPursuing
                                    ? "invisible"
                                    : ""
                                }`}
                              >
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                  <MonthPicker field={field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* checkBoxPursuing */}
                          <FormField
                            name={`education.${index}.checkboxPursuing`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem className="flex gap-2">
                                <FormControl>
                                  <Checkbox
                                    className="size-6 bg-white border"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel>Pursuing</FormLabel>
                              </FormItem>
                            )}
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
                  Submit
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
