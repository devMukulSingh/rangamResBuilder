"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setTechnicalSkills } from "@/redux/slice/userSlice";
import { FieldValues, useForm } from "react-hook-form";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CustomSkill = () => {
  const dispatch = useAppDispatch();
  const schema = z.object({
    customSkill: z
      .string()
      .max(20, {
        message: "Max 20 characters allowed",
      })
      .regex(/^[-.a-z0-9 ]+$/gi, {
        message: "Special characters are not allowed",
      }),
  });
  type formSchema = z.infer<typeof schema>;

  const form = useForm<formSchema>({
    resolver: zodResolver(schema),
  });
  const skillFromState = useAppSelector(
    (state) => state.persistedReducer.technicalSkills
  );

  const onSubmit = (data: formSchema, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    console.log(data);

    const customSkill = form.getValues().customSkill;

    if (customSkill && customSkill.trim() !== "") {
      const combinedSkills = [...skillFromState, customSkill];
      dispatch(setTechnicalSkills(combinedSkills));
    }
    form.setValue("customSkill", "");
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      form.handleSubmit(onSubmit);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          (data: formSchema, e?: React.BaseSyntheticEvent) => onSubmit(data, e)
        )}
        className="cols-span-1 sm:col-span-2"
      >
        <div className="w-full items-start">
          <FormField
            name="customSkill"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 ">
                <div className="flex gap-5 w-full h-16 items-center">
                  <FormControl>
                    <Input
                      className="shadow-md rounded-sm bg-white h-full py-2 w-full"
                      // onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                      onKeyUp={(e) => handleKeyUp(e)}
                      {...field}
                      placeholder="You didn't find? Enter your skill"
                    />
                  </FormControl>
                  <Button type="submit" className="flex rounded-sm">
                    Add
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default CustomSkill;
