"use client";
import { Form } from "@/components/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { resetForm, setPersonalInfo } from "@/redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
import Name from "./formFields/Name";
import Email from "./formFields/Email";
import Profession from "./formFields/Profession";
import Mobile from "./formFields/Mobile";
import FieldSkeleton from "./FieldSkeleton";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { personalSchema } from "@/lib/formSchemas";
const CountryCode = dynamic(() => import("./formFields/CountryCode"), {
  loading: () => <FieldSkeleton />,
});

export interface IForm {
  handleChange?: () => void;
  form: UseFormReturn<
    {
      fullName: string;
      email: string;
      profession: string;
      countryCode: string;
      mobile: string;
      state?: string | undefined;
      address?: string | undefined;
      dob?: string;
      birthPlace?: string | undefined;
      city?: string;
    },
    any,
    undefined
  >;
}

const PersonalForm = () => {
  
  const dispatch = useAppDispatch();
  const router = useRouter();

  type formSchema = z.infer<typeof personalSchema>;
  const personalInfo = useAppSelector(
    (state) => state.persistedReducer.personalInfo,
  );
  const form = useForm<formSchema>({
    resolver: zodResolver(personalSchema),
    defaultValues: personalInfo,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: formSchema) => {
    router.push(`/builder/goals?profession=${data.profession}`);
    dispatch(resetForm());
    dispatch(setPersonalInfo(data));
    await axios.post("/api/set-profession", { profession: data.profession });
  };
  useEffect(() => {
    router.prefetch(`/builder/goals`);
  }, []);
  return (
   
    <div className=" text-neutral-500 lg:w-fit w-full flex justify-center md:justify-end h-[30rem] ">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-10 py-10 bg-[#E0F3FF] flex flex-col gap-3 h-full w-full lg:w-[85%]  rounded-lg ">
            <Name form={form} />

            <Email form={form} />

            <Profession form={form} />

            <div className="flex gap-5 w-full">
              <CountryCode form={form} />
              <Mobile form={form} />
            </div>

            <Button
              disabled={isSubmitting}
              type="submit"
              className="mt-auto w-full py-3 flex gap-2"
            >
              Next
              {isSubmitting && <Loader className="animate-spin" />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PersonalForm;
