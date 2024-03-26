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
  return (
    <Form {...form}>
      <form className="col-span-2">
        <div className="gap-5 mt-auto self-end">
          <FormField
            name="customSkill"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex gap-5">
                <FormControl>
                  <Input
                    className="shadow-md rounded-sm bg-white py-6 w-full"
                    {...field}
                    placeholder="You didn't find? Enter your skill"
                  />
                </FormControl>
                <FormMessage />
                <Button
                  type="button"
                  onClick={handleAddMore}
                  className="
                                    flex
                                    gap-2
                                "
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
