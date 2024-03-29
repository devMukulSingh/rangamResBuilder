"use client";
import { setFormComp } from "@/redux/slice/commonSlice";
import { motion } from "framer-motion";
import Name from "@/app/(root)/builder/(routes)/personal/components/formFields/Name";
import Email from "@/app/(root)/builder/(routes)/personal/components/formFields/Email";
import Profession from "@/app/(root)/builder/(routes)/personal/components/formFields/Profession";
import Address from "./formFields/Address";
import CountryCode from "@/app/(root)/builder/(routes)/personal/components/formFields/CountryCode";
import Mobile from "@/app/(root)/builder/(routes)/personal/components/formFields/Mobile";
import City from "./formFields/City";
import State from "./formFields/State";
import DOB from "./formFields/DOB";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { setPersonalInfo } from "@/redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useState } from "react";

const PersonalForm = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const schema = z.object({
    fullName: z
      .string()
      .min(3, {
        message: "Name should be minimum 3 characters",
      })
      .max(30, {
        message: "Name should be max 30 characters",
      }),
    email: z.string().email({
      message: "Please enter valid email",
    }),
    profession: z
      .string()
      .min(3, {
        message: "Profession should be minimum 5 characters",
      })
      .max(30, {
        message: "Profession should be max 30 characters",
      }),
    address: z.string().optional(),
    countryCode: z.string().min(2, {
      message: "CountryCode should be minimum 2 numbers",
    }),
    mobile: z.string().min(10, {
      message: "Mobile no should be minimum 10 numbers",
    }),
    city: z.string().optional(),
    state: z.string().optional(),
    dob: z.any().optional(),
  });

  type formSchema = z.infer<typeof schema>;
  const personalInfo = useAppSelector(
    (state) => state.persistedReducer.personalInfo,
  );

  const form = useForm<formSchema>({
    resolver: zodResolver(schema),
    defaultValues: personalInfo || {
      countryCode: "+1(USD)",
      email: "",
      fullName: "",
      mobile: "",
      profession: "",
      state: "",
      dob: "",
      address: "",
      city: "",
    },
  });

  const onSubmit = () => {
    dispatch(setFormComp("Experience"));
  };
  const handleChange = () => {
    dispatch(setPersonalInfo(form.getValues()));
  };

  return (
    <motion.div
      animate={{ x: 1, opacity: [0, 1] }}
      initial={{ x: -150, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-5 pt-10 pb-20">
        <Form {...form}>
          <form onChange={handleChange} onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              {/* Name */}
              <Name form={form} />

              {/* email */}
              <Email form={form} />

              {/* profession */}
              <Profession form={form} />

              {/* address */}
              <Address form={form} />

              <div className="flex gap-5 w-full">
                {/* countryCode */}
                <CountryCode form={form} />
                {/* mobile no */}
                <Mobile form={form} />
              </div>

              <div className="flex gap-5 w-full">
                <City form={form} />
                <State form={form} />
              </div>

              <div className="flex gap-5 w-full">
                <DOB form={form} />
              </div>

              {/* <Button type="submit" className="w-full">
                Next
              </Button> */}
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
};

export default PersonalForm;
