import { z } from "zod";
import { allowedFileTypes } from "@/constants";
import { fileCategoriesForFiltering } from "@/constants/constants";
import { isValid, parse } from "date-fns";
export const signUpWithEmailSchema = z
  .object({
    email: z.email({
      error: "Invalid email address",
    }),
    password: z
      .string({ error: "Password is required" })
      .min(8, { error: "Password must be at least 8 characters long" })
      .max(64, { error: "Password must be at most 64 characters long" }),
    name: z
      .string({ error: "Name is required" })
      .min(1, { error: "Name is required" }),
    confirmPassword: z
      .string({ error: "Confirm password is required" })
      .min(1, { error: "Confirm password is required" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const signInWithEmailSchema = z.object({
  email: z.email({
    error: "Invalid email address",
  }),
  password: z
    .string({ error: "Password is required" })
    .min(1, { error: "Password is required" }),
});

export const fileUploadSchema = z.object({
  file: z
    .instanceof(File, { error: "File is required." })
    .refine(
      (file) => {
        return allowedFileTypes.includes(file.type);
      },
      { error: "Please upload JPG, JPEG or PNG file" },
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024, // 5MB limit
      { error: "File size must be less than 5MB" },
    ),
});
export const fetchFileQueryParamsSchema = z
  .object({
    category: z.enum(fileCategoriesForFiltering).default("All"),

    startDate: z.iso
      .date()
      .transform((date) => parse(date, "yyyy-MM-dd", new Date()))
      .refine((date) => !date || isValid(date), { message: "Invalid date" })
      .optional(),

    endDate: z.iso
      .date()
      .transform((date) => parse(date, "yyyy-MM-dd", new Date()))
      .refine((date) => !date || isValid(date), { message: "Invalid date" })
      .optional(),

    searchString: z
      .string()
      .transform((value) => value.trim().toLowerCase())
      .default(""),
  })
  .strip();
