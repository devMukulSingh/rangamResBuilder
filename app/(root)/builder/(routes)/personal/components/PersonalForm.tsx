"use client";
import { Form } from "@/components/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { resetForm, setPersonalInfo } from "@/redux/slice/userSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";
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

export interface IForm {
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
      .email({
        message: "Please enter valid email",
      }),
    profession: z
      .string({
        required_error: "Profession is required",
      })
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
      .min(2, {
        message: "CountryCode must be minimum 2 numbers",
      }),
    mobile: z
      .string({
        required_error: "Mobile no is required",
        invalid_type_error: "must be a number",
      })
      .refine(validator.isMobilePhone),
    state: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
    dob: z.string().optional(),
    birthPlace: z.string().optional(),
  });

  type formSchema = z.infer<typeof schema>;

  const form = useForm<formSchema>({
    resolver: zodResolver(schema),
  });

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
    <div className=" text-neutral-500 lg:w-fit w-full flex justify-center md:justify-end  items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="py-8 px-10 bg-[#E0F3FF] flex flex-col gap-3 w-full md:w-fit  rounded-lg ">
            <Name form={form} />

            <Email form={form} />

            <Profession form={form} />

            <div className="flex gap-5 w-full">
              <CountryCode form={form} />
              <Mobile form={form} />
            </div>

            <Button type="submit" className="w-full py-3 mt-4">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
    // </motion.div>
  );
};

export default PersonalForm;
