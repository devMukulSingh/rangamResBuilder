"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languagesData, strengths } from "@/lib/constants/constants";
import { Loader, PlusCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setLanguages, setUserId } from "@/redux/slice/userSlice";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import { updateResumeData } from "../education/EducationForm";

const LanguageForm = () => {
  const resumeData = useAppSelector((state) => state.persistedReducer);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const languages = useAppSelector((state) => state.persistedReducer.languages);

  const { trigger, isMutating, error } = useSWRMutation(
    `/api/user/update-resumedata`,
    updateResumeData,
    {
      onSuccess(data) {
        dispatch(setUserId(data.data.id));
      },
    },
  );

  const form = useForm({
    defaultValues: {
      languageInfo:
        languages.length === 0
          ? [
              { language: "English", strength: "" },
              { language: "English", strength: "" },
              { language: "English", strength: "" },
            ]
          : languages,
    },
  });

  const fieldArray = useFieldArray({
    name: "languageInfo",
    control: form.control,
  });

  const watchFieldsArray = form.watch("languageInfo");

  const onSubmit = async () => {
    try {
      await trigger(resumeData);
    } catch (e) {
      console.log(`Error in onSubmit PUT req ${e}`);
    } finally {
      router.push(`/download`);
    }
  };

  const handleChange = () => {
    const languageInfo = form.getValues().languageInfo;
    const parsedLanguage = languageInfo.map((item) => {
      return {
        language: item.language,
        strength: item.strength,
      };
    });
    dispatch(setLanguages(parsedLanguage));
  };

  const controlledFields = fieldArray.fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldsArray[index],
    };
  });

  const handleAddMore = () => {
    if (controlledFields.length > 3) {
      toast.error(`Maximum 4 Languages required`);
    } else {
      fieldArray.append({ language: "English", strength: "" });
    }
  };
  if (error) {
    console.log(`Error in PUT req resumedata ${error}`);
  }
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
              {controlledFields?.map((item, index) => {
                return (
                  <div className="flex gap-2 " key={item.id}>
                    <FormField
                      name={`languageInfo.${index}.language`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="w-1/2 ">
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormLabel>Language</FormLabel>
                            <FormControl>
                              <SelectTrigger className="bg-white">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {languagesData?.map((language) => (
                                <SelectItem key={language} value={language}>
                                  {language}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={`languageInfo.${index}.strength`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="w-1/2">
                          <FormLabel>Strength</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Proficient" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {strengths.map((strength) => (
                                <SelectItem key={strength} value={strength}>
                                  {strength}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                );
              })}

              <Button
                type="button"
                onClick={handleAddMore}
                variant="ghost"
                className="self-start flex items-center gap-2 bg-transparent"
              >
                <PlusCircle />
                Add more language
              </Button>
              <Button
                disabled={isMutating}
                type="submit"
                className="w-[15rem] py-6 self-center mt-20"
              >
                Submit
                {isMutating && <Loader className="animate-spin" />}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
};

export default LanguageForm;
