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
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setContact } from "@/redux/slice/userSlice";
import { useParams, useRouter } from "next/navigation";
import { setProgress } from "@/redux/slice/userSlice";
import { setFormComp } from "@/redux/slice/commonSlice";
import { motion } from "framer-motion";

const SocialForm = () => {
  const dispatch = useAppDispatch();
  const socialLinks = useAppSelector((state) => state.persistedReducer.contact);
  const form = useForm({
    defaultValues: socialLinks || {
      github: "",
      linkedIn: "",
      portfolio: "",
      twitter: "",
    },
  });

  const onSubmit = () => {
    dispatch(setFormComp("Projects"));
  };

  const handleChange = () => {
    dispatch(setContact(form.getValues()));
  };

  return (
    <motion.div
      animate={{ x: 1, opacity: [0, 1] }}
      initial={{ x: -150, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} onChange={handleChange}>
            <div className="flex flex-col gap-5">
              <FormField
                name="linkedIn"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Linkedin Profile</FormLabel>
                    <FormControl>
                      <Input
                        className="py-8 bg-white"
                        {...field}
                        placeholder="https://johndoe.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="twitter"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter Profile</FormLabel>
                    <FormControl>
                      <Input
                        className="py-8 bg-white"
                        {...field}
                        placeholder="https://johndoe.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="github"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Github Profile</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://johndoe.com"
                        className="bg-white py-8 "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="portfolio"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio</FormLabel>
                    <FormControl>
                      <Input
                        className="py-8 bg-white"
                        {...field}
                        placeholder="https://johndoe.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

export default SocialForm;
