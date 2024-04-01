import { FormControl, FormField, FormItem } from "@/components/ui/form";
import React, { FC, useCallback } from "react";
import { IExperienceForm } from "../ExperienceForm";
import { Plus } from "lucide-react";
import Competence from "./Competence";
import CompetenceSkeleton from "../CompetenceSkeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setCompLoading } from "@/redux/slice/commonSlice";
import axios from "axios";
import RichTextEditor from "@/components/commons/RichTextEditor";
import { setDescription } from "@/redux/slice/userSlice";

const Competences: FC<IExperienceForm> = ({ form, index }) => {
  const dispatch = useAppDispatch();
  const jobTitle = form.getValues().experience[index].jobTitle;
  const handleLoadMore = async () => {
    try {
      dispatch(setCompLoading(true));
      const { data } = await axios.get("/api/ai/get-competences", {
        params: {
          jobTitle,
        },
      });
      const prevCompetences = form.getValues(`experience.${index}.competences`);
      form.setValue(`experience.${index}.competences`, [
        ...prevCompetences,
        ...data,
      ]);
    } catch (e) {
      console.log(`Error in getCompetences ${e}`);
    } finally {
      dispatch(setCompLoading(false));
    }
  };
  const isLoading = useAppSelector(
    (state) => state.commonSlice.competenceLoading
  );
  // const handleChange = useCallback((content, field) => {
  //   const currentComp = form.getValues().experience[index].competences;
  //   const last = currentComp.pop();
  //   console.log(last);

  //   field.onChange([
  //     ...field.value,
  //     {
  //       description: content,
  //       ...last,
  //     },
  //   ]);
  // },[]);

  if (isLoading) return <CompetenceSkeleton />;

  return (
    <FormField
      name={`experience.${index}.competences`}
      control={form.control}
      render={({ field }) => (
        <>
          {field.value.length <= 1 && <CompetenceSkeleton />}
          <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-5">
            {field.value?.map((competence, i) => (
              <FormItem key={i}>
                <FormControl>
                  <Competence
                    form={form}
                    index={index}
                    // onChange={field.onChange}
                    competence={competence}
                    competenceIndex={i}
                  />
                </FormControl>
              </FormItem>
            ))}
          </div>
          <div
            onClick={handleLoadMore}
            className={`
            w-fit
            flex
            items-center
            gap-2
            col-span-2
            cursor-pointer
             ${form.getValues().experience[index].competences[0].name === "" ? "hidden" : ""}
            ${form.getValues().experience[index].competences.length === 14 ? "hidden" : ""}
            `}
          >
            <Plus color="#004878" />
            <h1
              className={`
              text-[#004878]
              `}
            >
              Load More key responsibility
            </h1>
          </div>
        </>
      )}
    />
  );
};

export default Competences;
// <RichTextEditor
//   value={
//     field.value
//       .map((item) => item?.description?.concat("<br/></li>"))
//       .join("") || ""
//   }
//   onChange= { (content) => {dispatch(setDescription({
//     value:content,
//     index
//   }))}}/>
