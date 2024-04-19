import * as z from "zod";
import validator from "validator";
import { parseISO } from "date-fns";

//builder route schemas
export const personalSchema = z.object({
  fullName: z
    .string({
      required_error: "Full name is required",
    })
    .trim()
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
    .trim()
    .email({
      message: "Please enter valid email",
    })
    .refine((data) => data.endsWith("com"), {
      message: "Please enter valid email",
    }),
  profession: z
    .string({
      required_error: "Profession is required",
    })
    .trim()
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
    .trim()
    .min(2, {
      message: "CountryCode must be minimum 2 numbers",
    }),
  mobile: z
    .string({
      required_error: "Mobile no is required",
      invalid_type_error: "must be a number",
    })
    .trim()
    .refine(validator.isMobilePhone),
  state: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  dob: z.string().optional(),
  birthPlace: z.string().optional(),
});

export const customSkillSchema = z.object({
  customSkill: z
    .string()
    .max(20, {
      message: "Max 20 characters allowed",
    })
    .regex(/^[-.a-z0-9 ]*$/gi, {
      message: "Special characters are not allowed",
    })
    .optional(),
});

export const experienceSchema = z
  .object({
    experience: z
      .object({
        CompanyName: z.string().optional(),
        jobTitle: z.string().optional(),
        startDate: z
          .any({
            required_error: "Start date is required",
          })
          .optional(),
        endDate: z.any().optional(),
        checkboxWorkingStatus: z.string().optional(),
        checkboxVolunteering: z.string().optional(),
        checkboxInternship: z.string().optional(),
      })
      .refine(
        (data) => {
          let startDate = data.startDate;
          let endDate = data?.endDate;
          if (typeof startDate === "string") {
            startDate = parseISO(startDate);
          }
          if (endDate && typeof endDate === "string") {
            endDate = parseISO(endDate);
          }
          if (data.endDate && startDate < endDate) return true;
        },
        {
          message: `End date must be greater than start date`,
          path: ["endDate"],
        },
      ),
  })
  .array();

export const educationSchema = z.object({
  education: z
    .object({
      id: z.string(),
      schoolName: z
        .string({
          required_error: "School name is required",
          invalid_type_error: "Invalid string",
        })
        .trim()
        .min(1, {
          message: "School name is required",
        }),
      degree: z
        .string({
          required_error: "Degree is required",
          invalid_type_error: "Invalid string",
        })
        .trim()
        .min(1, {
          message: "Degree is required",
        }),
      speciality: z
        .string({
          required_error: "Speciality is required",
          invalid_type_error: "Invalid string",
        })
        .trim()
        .min(1, {
          message: "Specialiy is required",
        }),
      startDate: z
        .any({
          required_error: "Start date is required",
        })
        .refine(
          (data) => {
            if (data) return true;
          },
          {
            message: "Start date is required",
          },
        ),
      endDate: z.any().optional(),
      checkboxPursuing: z.boolean(),
    })
    .refine(
      (data) => {
        let startDate = data.startDate;
        let endDate = data?.endDate;
        if (typeof startDate === "string") {
          startDate = parseISO(startDate);
        }
        if (endDate && typeof endDate === "string") {
          endDate = parseISO(endDate);
        }
        if (
          data.checkboxPursuing ||
          startDate < endDate ||
          !startDate ||
          !endDate
        )
          return true;
      },
      {
        message: `End date must be greater than start date`,
        path: ["endDate"],
      },
    )
    .array()
    .min(1, {
      message: "1 is required",
    }),
});

//edit-resume route schemas
