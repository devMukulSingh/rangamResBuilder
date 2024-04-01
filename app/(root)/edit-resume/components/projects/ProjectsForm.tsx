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
import { setProjects } from "@/redux/slice/userSlice";
import { PlusCircle, Trash } from "lucide-react";
import { setProgress } from "@/redux/slice/userSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import dynamic from "next/dynamic";
import { setFormComp } from "@/redux/slice/commonSlice";
const RichTextEditor = dynamic(
  () => import("@/components/commons/RichTextEditor"),
  {
    ssr: false,
  }
);
import { motion } from "framer-motion";
import MCEEditor from "@/components/commons/MCEEditor";

const ProjectsForm = () => {
  const [expanded, setExpanded] = useState<string | false>("");
  const dispatch = useAppDispatch();
  const progress = useAppSelector((state) => state.persistedReducer.progress);
  const projects = useAppSelector((state) => state.persistedReducer.projects);

  const form = useForm({
    defaultValues: {
      projects: projects || [
        {
          projectName: "",
          projectUrl: "",
          description: "",
          id: Math.floor(Math.random() * 100).toString(),
        },
      ],
    },
  });

  const fieldArray = useFieldArray({
    name: "projects",
    control: form.control,
  });
  const watchFieldsArray = form.watch("projects");

  const controlledFields = fieldArray.fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldsArray[index],
    };
  });

  const onSubmit = () => {
    dispatch(setFormComp("Achievements"));
    if (progress <= 70) {
      dispatch(setProgress());
    }
  };

  const handleChange = () => {
    const projects = form.getValues().projects;
    const parsedProjects = projects.map((item) => {
      return {
        projectName: item.projectName,
        projectUrl: item.projectUrl,
        description: item.description,
        id: item.id,
      };
    });
    dispatch(setProjects(parsedProjects));
  };

  const handleAddMore = () => {
    if (controlledFields.length < 4) {
      const emptyField = {
        projectName: "",
        projectUrl: "",
        description: "",
        id: Math.floor(Math.random() * 100).toString(),
      };
      fieldArray.append(emptyField);
    } else {
      toast.error("Max 4 pojects allowed");
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
    if (!projects || projects.length < controlledFields.length) {
      dispatch(setProjects(controlledFields));
      const expandedFieldIndex = controlledFields.length - 1;
      setExpanded(controlledFields[expandedFieldIndex].id);
    }
    //handling delete collapsible
    else if (projects && projects.length > controlledFields.length) {
      console.log("else", controlledFields);

      if (controlledFields.length > 0) {
        dispatch(setProjects(controlledFields));
      } else {
        toast.error("Profile should have at least one projects field");
      }
    }
  }, [controlledFields.length]);

  return (
    <motion.div
      animate={{ x: 1, opacity: [0, 1] }}
      initial={{ x: -150, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="px-5 py-10 pb-20 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} onChange={handleChange}>
            <div className="flex flex-col gap-5">
              {projects?.map((item, index) => {
                return (
                  <Collapsible
                    key={index}
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
                          className="w-full text-neutral-100 hover:bg-red-300"
                        >
                          {projects?.[index]?.projectName || "Project"}
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
                      {/* ProjectName */}
                      <FormField
                        name={`projects.${index}.projectName`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name of Project</FormLabel>
                            <FormControl>
                              <Input
                                className="py-8 bg-white"
                                {...field}
                                placeholder="Google Lance"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* ProjectUrl */}
                      <FormField
                        name={`projects.${index}.projectUrl`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Url</FormLabel>
                            <FormControl>
                              <Input
                                className="py-8 bg-white"
                                {...field}
                                placeholder="www.google.com"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* ProjectDescription */}
                      <FormField
                        name={`projects.${index}.description`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <MCEEditor
                                height={200}
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
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}

              <Button
                onClick={handleAddMore}
                variant="ghost"
                type="button"
                className="gap-2 self-start bg-transparent text-neutral-700"
              >
                <PlusCircle />
                Add More Projects
              </Button>
              {/* <Button type="submit" className="w-full py-6">
                Next
              </Button> */}
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
};

export default ProjectsForm;
