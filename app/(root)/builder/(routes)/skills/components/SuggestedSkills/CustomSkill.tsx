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
import { useForm } from "react-hook-form";
import React from "react";

const CustomSkill = () => {
  const dispatch = useAppDispatch();

  const form = useForm({});
  const skillFromState = useAppSelector(
    (state) => state.persistedReducer.technicalSkills,
  );

  const handleAddMore = () => {
    const customSkill = form.getValues().customSkill;
    if (customSkill !== "") {
      const combinedSkills = [...skillFromState, customSkill];
      dispatch(setTechnicalSkills(combinedSkills));
    }
    form.setValue("customSkill", "");
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddMore();
    }
  };
  return (
    <Form {...form}>
      <form className="cols-span-1 sm:col-span-2">
        <div className=" flex w-full items-start h-16">
          <FormField
            name="customSkill"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex gap-5 w-full items-center h-full ">
                <FormControl>
                  <Input
                    className="shadow-md rounded-sm bg-white h-full py-2 w-full"
                    onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                    onKeyUp={(e) => handleKeyUp(e)}
                    {...field}
                    placeholder="You didn't find? Enter your skill"
                  />
                </FormControl>
                <FormMessage />
                <Button
                  type="button"
                  onClick={handleAddMore}
                  className="flex rounded-sm"
                >
                  Add
                </Button>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default CustomSkill;
