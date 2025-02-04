"use client";
import dynamic from "next/dynamic";
import { setFormComp, setValidatedOptions } from "@/redux/slice/commonSlice";
import { motion } from "framer-motion";
import Name from "@/app/(root)/builder/(routes)/personal/components/formFields/Name";
import Email from "@/app/(root)/builder/(routes)/personal/components/formFields/Email";
import Profession from "@/app/(root)/builder/(routes)/personal/components/formFields/Profession";
import Address from "./formFields/Address";
import Phone from "@/app/(root)/builder/(routes)/personal/components/formFields/Phone";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { setPersonalInfo } from "@/redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { Button } from "@/components/ui/button";
import { personalSchema } from "@/lib/schema/formSchemas";
import FieldSkeleton from "../commons/FieldSkeleton";
const City = dynamic(() => import("./formFields/City"));
const State = dynamic(() => import("./formFields/State"));
const DOB = dynamic(() => import("./formFields/DOB"));
const CountryCode = dynamic(
  () =>
    import(
      "@/app/(root)/builder/(routes)/personal/components/formFields/Phone"
    ),
  {
    loading: () => <FieldSkeleton />,
  },
);

const PersonalForm = () => {
  const dispatch = useAppDispatch();
  type formSchema = z.infer<typeof personalSchema>;
  const personalInfo = useAppSelector(
    (state) => state.persistedReducer.personalInfo,
  );

  const form = useForm<formSchema>({
    resolver: zodResolver(personalSchema),
    defaultValues: personalInfo || {
      countryCode: "+1 (USD)",
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
    const isValidated = form.formState.isValid;
    dispatch(setFormComp("Experience"));
    dispatch(
      setValidatedOptions({
        name: "Personal Information",
        isValidated: true,
        index: 0,
      }),
    );
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
              <Name form={form} />

              <Email form={form} />

              <Profession form={form} />

              <Address form={form} />

              <div className="flex gap-5 w-full">
                {/* <CountryCode form={form} handleChange={handleChange} /> */}
                <Phone form={form} />
              </div>

              <div className="flex gap-5 w-full">
                <City form={form} />
                <State form={form} />
              </div>

              <div className="flex gap-5 w-full">
                <DOB form={form} />
              </div>

              <Button type="submit" className="self-center w-1/3 mt-10">
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
};

export default PersonalForm;
