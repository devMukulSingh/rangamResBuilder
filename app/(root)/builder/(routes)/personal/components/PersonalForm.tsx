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
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Name from "./formFields/Name";
import Email from "./formFields/Email";
import Profession from "./formFields/Profession";
import Mobile from "./formFields/Mobile";
import FieldSkeleton from "./FieldSkeleton";
const CountryCode = dynamic(() => import("./formFields/CountryCode"), {
  loading: () => <FieldSkeleton />,
});
import validator from "validator";
import { Loader } from "lucide-react";

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

  const schema = z.object({
    fullName: z
      .string({
        required_error: "Full name is required",
      })
      .trim()
      .min(3, {
        message: "Name must be minimum 3 characters",
      })
      .max(30, {
        message: "Name must be max 30 characters",
      }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .trim()
      .email({
        message: "Please enter valid email",
      })
      .refine((data) => data.endsWith("com"), {
        message: "Please enter valid email",
      }),
    profession: z
      .string({
        required_error: "Profession is required",
      })
      .trim()
      .min(3, {
        message: "Profession must be minimum 5 characters",
      })
      .max(30, {
        message: "Profession must be max 30 characters",
      }),
    countryCode: z
      .string({
        required_error: "Country code is required",
      })
      .trim()
      .min(2, {
        message: "CountryCode must be minimum 2 numbers",
      }),
    mobile: z
      .string({
        required_error: "Mobile no is required",
        invalid_type_error: "must be a number",
      })
      .trim()
      .refine(validator.isMobilePhone),
    state: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
    dob: z.string().optional(),
    birthPlace: z.string().optional(),
  });

  type formSchema = z.infer<typeof schema>;
  const personalInfo = useAppSelector(
    (state) => state.persistedReducer.personalInfo,
  );
  const form = useForm<formSchema>({
    resolver: zodResolver(schema),
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
  return (
    // <motion.div
    //     initial={{ opacity: 0 }}
    //     animate={{ opacity: [0, 1], scale: [0.9, 1] }}
    //     transition={{ duration: 0.4 }}
    // >
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
    // </motion.div>
  );
};

export default PersonalForm;
