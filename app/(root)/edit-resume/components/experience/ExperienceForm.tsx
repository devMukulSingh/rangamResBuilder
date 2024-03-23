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
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { setExperience } from "@/redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useEffect, useState } from "react";
import { PlusCircle, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams, useRouter } from "next/navigation";
import { setProgress } from "@/redux/slice/userSlice";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { setFormComp } from "@/redux/slice/commonSlice";
import { motion } from "framer-motion";
const RichTextEditor = dynamic(
  () => import("@/components/commons/RichTextEditor"),
  {
    ssr: false,
  }
);

const ExperienceForm = () => {
  const { templateId } = useParams();
  const progress = useAppSelector((state) => state.persistedReducer.progress);
  const [expanded, setExpanded] = useState<string | false>("");
  const dispatch = useAppDispatch();
  const experience = useAppSelector(
    (state) => state.persistedReducer.experience
  );

  const form = useForm({
    defaultValues: {
      experience: experience || [
        {
          companyName: "",
          startDate: "",
          endDate: "",
          jobTitle: "",
          checkboxInternship: false,
          checkboxVolunteering: false,
          competences: [],
          description: "",
          id: Math.floor(Math.random() * 100).toString(),
          checkboxWorkingStatus: false,
          // role: '',
          // address: '',
          // employer: '',
        },
      ],
    },
  });

  const fieldArray = useFieldArray({
    name: "experience",
    control: form.control,
  });

  const watchFieldsArray = form.watch("experience");

  const controlledFields = fieldArray.fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldsArray[index],
    };
  });

  const onSubmit = () => {
    dispatch(setFormComp("Skills"));
    if (progress <= 22) {
      dispatch(setProgress());
    }
  };
  const handleChange = () => {
    const experience = form.getValues().experience;

    const parsedExperience = experience.map((item) => {
      return {
        companyName: item.companyName,
        startDate: item.startDate,
        endDate: item.endDate,
        id: item.id,
        description: item.description,
        checkboxWorkingStatus: item.checkboxWorkingStatus,
        jobTitle: item.jobTitle,
        checkboxInternship: item.checkboxInternship,
        checkboxVolunteering: item.checkboxVolunteering,
        competences: item.competences,
        // address: item.address,
        // employer: item.employer,
        // role: item.role,
      };
    });
    dispatch(setExperience(parsedExperience));
  };

  const handleAddMore = () => {
    fieldArray.append({
      companyName: "",
      startDate: "",
      endDate: "",
      checkboxInternship: false,
      checkboxVolunteering: false,
      competences: [],
      jobTitle: "",
      description: "",
      id: Math.floor(Math.random() * 100).toString(),
      checkboxWorkingStatus: false,
      // checkbox: false,
      // role: '',
      // address: '',
      // employer: '',
    });
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
    if (!experience || experience.length < controlledFields.length) {
      dispatch(setExperience(controlledFields));
      const expandedFieldIndex = controlledFields.length - 1;
      setExpanded(controlledFields[expandedFieldIndex].id);
    }
    //handling delete collapsible
    else if (experience && experience.length > controlledFields.length) {
      if (controlledFields.length > 0) {
        dispatch(setExperience(controlledFields));
      } else {
        toast.error("Profile should have at least one experience field");
      }
    }
  }, [controlledFields.length]);

  return (
    <motion.div
      animate={{ x: 1, opacity: [0, 1] }}
      initial={{ x: -150, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} onChange={handleChange}>
            <div className="flex flex-col gap-5 ">
              {(!experience ? controlledFields : experience)?.map(
                (item, index) => {
                  return (
                    <Collapsible
                      key={index}
                      onOpenChange={() =>
                        handleCollapsible(item.id, item.id === expanded)
                      }
                      className={`space-y-2`}
                      open={item.id === expanded}
                    >
                      <div className="flex hover:bg-red-300 items-center bg-red-400 px-5">
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full hover:bg-red-300 text-neutral-100"
                          >
                            {experience?.[index].companyName || "Company"}
                          </Button>
                        </CollapsibleTrigger>
                        <Trash
                          className="ml-auto cursor-pointer text-neutral-200"
                          onClick={() => handleDelete(index)}
                        />
                      </div>

                      <CollapsibleContent
                        className={`flex
                                                 flex-col
                                                  gap-5
                                                   border 
                                                   p-5 
                                                   transition-transform 
                                                   data-[state=open]:animate-accordion-down 
                                                   `}
                        key={item.id}
                      >
                        {/* CompanyName */}
                        <FormField
                          name={`experience.${index}.companyName`}
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company</FormLabel>
                              <FormControl>
                                <Input
                                  className="bg-white"
                                  {...field}
                                  placeholder="Rangam"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* jobTitle */}
                        <FormField
                          name={`experience.${index}.jobTitle`}
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Job title</FormLabel>
                              <FormControl>
                                <Input
                                  className="bg-white"
                                  {...field}
                                  placeholder="Enter your desired job title"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* checkboxes */}
                        <div className="flex gap-5">
                          <FormField
                            name={`experience.${index}.checkboxInternship`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem className={`flex items-center gap-4`}>
                                <FormControl>
                                  <Checkbox
                                    disabled={
                                      form.getValues().experience[index]
                                        .checkboxVolunteering
                                    }
                                    className={`size-6`}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel>Internship</FormLabel>
                              </FormItem>
                            )}
                          />
                          <FormField
                            name={`experience.${index}.checkboxVolunteering`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem className={`flex items-center gap-4`}>
                                <FormControl>
                                  <Checkbox
                                    disabled={
                                      form.getValues().experience[index]
                                        .checkboxInternship
                                    }
                                    className="size-6"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel>Volunteering</FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* description */}

                        <FormField
                          defaultValue="Creative Frontend Developer with expertise in HTML, CSS, and JavaScript. Proven ability to transform design concepts into responsive web applications. Passionate about delivering visually appealing and user-centric experiences"
                          name={`experience.${index}.description`}
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <RichTextEditor
                                  value={field.value || ""}
                                  onChange={(content) => {
                                    field.onChange(content);
                                    handleChange();
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* start and endDate */}
                        <div className="flex gap-5 mt-10">
                          <FormField
                            name={`experience.${index}.startDate`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                  <Input
                                    className="bg-white"
                                    {...field}
                                    type="month"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {experience &&
                            !experience?.[index]?.checkboxWorkingStatus && (
                              <FormField
                                name={`experience.${index}.endDate`}
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>End Date</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="MM YY"
                                        type="month"
                                        className="bg-white"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                        </div>

                        {/* checkbox */}
                        <FormField
                          name={`experience.${index}.checkboxWorkingStatus`}
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-4">
                              <FormControl>
                                <Checkbox
                                  className="size-6"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>Currently working here</FormLabel>
                            </FormItem>
                          )}
                        />
                      </CollapsibleContent>
                    </Collapsible>
                  );
                }
              )}

              <Button
                onClick={handleAddMore}
                type="button"
                variant="ghost"
                className="gap-2 self-start bg-transparent mt-5"
              >
                <PlusCircle />
                Add More
              </Button>

              {/* <Button type="submit" className="w-full py-6 mt-5">
                Next
              </Button> */}
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
};

export default ExperienceForm;
