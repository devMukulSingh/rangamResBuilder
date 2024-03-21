import React, { FC } from 'react'
import { IeducationForm } from '../EducationForm'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"
import { setProgress } from "@/redux/slice/userSlice";
import { FieldValues, useFieldArray, useForm, UseFormReturn } from "react-hook-form"
import { setFormComp } from "@/redux/slice/commonSlice";
import { motion } from "framer-motion"
import { Plus, Trash, X } from "lucide-react";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Degree: FC<IeducationForm> = ({
  form,
  index
}) => {
  return (
    <FormField
      name={`education.${index}.degree`}
      control={form.control}
      render={({ field }) => (
        <FormItem >
          <FormLabel>Degree/Program</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="bg-white h-14 rounded-sm" >
                <SelectValue placeholder="Bachelor in Technology" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="light">Bachelor in Technology</SelectItem>
              <SelectItem value="dark">Bachelor in Technology</SelectItem>
              <SelectItem value="system">Bachelor in Technology</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}

export default Degree