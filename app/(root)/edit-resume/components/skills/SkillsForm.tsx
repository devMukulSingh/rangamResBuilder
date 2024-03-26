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
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { setTechnicalSkills } from "@/redux/slice/userSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import Spinner from "@/components/commons/Spinner";
import SkillsSkeleton from "./SkillsSkeleton";
import Skill from "./Skill";
import { setProgress } from "@/redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setFormComp } from "@/redux/slice/commonSlice";
import { motion } from "framer-motion";
import CustomSkill from "./CustomSkill";

const SkillsForm = () => {
  const technicalSkills = useAppSelector(
    (state) => state.persistedReducer.technicalSkills,
  );

  return (
    <motion.div
      animate={{ x: 1, opacity: [0, 1] }}
      initial={{ x: -150, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-5 flex flex-col gap-5 ">
        <section>
          <h1 className=" font-semibold mb-5">Select AI Suggested Skill</h1>
          <div className="grid grid-cols-2 gap-5">
            {technicalSkills.map((skill) => (
              <Skill skill={skill} key={skill} />
            ))}
          </div>
        </section>

        <CustomSkill />
      </div>
    </motion.div>
  );
};

export default SkillsForm;
