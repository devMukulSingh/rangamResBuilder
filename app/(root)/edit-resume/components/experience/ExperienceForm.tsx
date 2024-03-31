"use client";
import { Form } from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { setExperience } from "@/redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useEffect, useState } from "react";
import { PlusCircle, Trash } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import toast from "react-hot-toast";
import { setFormComp } from "@/redux/slice/commonSlice";
import { motion } from "framer-motion";
import CompanyName from "@/app/(root)/builder/(routes)/experience/components/formFields/CompanyName";
import JobTitle from "@/app/(root)/builder/(routes)/experience/components/formFields/JobTitle";
import CheckboxInternship from "@/app/(root)/builder/(routes)/experience/components/formFields/CheckboxInternship";
import CheckboxVolunteering from "@/app/(root)/builder/(routes)/experience/components/formFields/CheckboxVolunteering";
import Description from "@/app/(root)/builder/(routes)/experience/components/formFields/Description";
import CheckboxWorkingStatus from "@/app/(root)/builder/(routes)/experience/components/formFields/CheckboxWorkingStatus";
import StartDate from "@/app/(root)/builder/(routes)/experience/components/formFields/StartDate";
import EndDate from "@/app/(root)/builder/(routes)/experience/components/formFields/EndDate";
import Employer from "./formFields/Employer";
import Address from "./formFields/Address";

const ExperienceForm = () => {
  const [expanded, setExpanded] = useState<string | false>("");
  const dispatch = useAppDispatch();
  const experience = useAppSelector(
    (state) => state.persistedReducer.experience,
  );

  const form = useForm({
    defaultValues: {
      experience: experience || [
        {
          companyName: "",
          startDate: null,
          endDate: null,
          jobTitle: "",
          checkboxInternship: false,
          checkboxVolunteering: false,
          competences: [
            {
              id: 0,
              name: "",
              isSelected: false,
              description: "",
            },
          ],
          description: "",
          id: Math.floor(Math.random() * 100).toString(),
          checkboxWorkingStatus: false,
          role: "",
          address: "",
          employer: "",
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
        address: item.address,
        employer: item.employer,
      };
    });
    dispatch(setExperience(parsedExperience));
  };

  const handleAddMore = () => {
    fieldArray.append({
      companyName: "",
      startDate: null,
      endDate: null,
      checkboxInternship: false,
      checkboxVolunteering: false,
      competences: [
        {
          id: 0,
          name: "",
          isSelected: false,
          description: "",
        },
      ],
      jobTitle: "",
      description: "",
      id: Math.floor(Math.random() * 100).toString(),
      checkboxWorkingStatus: false,
      address: "",
      employer: "",
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
                        <CompanyName index={index} form={form} />

                        <JobTitle index={index} form={form} />

                        <div className="flex gap-5">
                          <CheckboxInternship index={index} form={form} />
                          <CheckboxVolunteering index={index} form={form} />
                        </div>

                        <Employer form={form} index={index} />

                        <Address form={form} index={index} />

                        <div className="flex gap-5 w-full">
                          <StartDate form={form} index={index} />
                          <EndDate form={form} index={index} />
                        </div>

                        <div className="self-start">
                          <CheckboxWorkingStatus index={index} form={form} />
                        </div>

                        <Description form={form} index={index} />
                      </CollapsibleContent>
                    </Collapsible>
                  );
                },
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
