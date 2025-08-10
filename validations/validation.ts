import { z } from "zod";
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
    .instanceof(File)
    .refine(
      (file) => {
        console.log(file.type);
        return [
          // "application/pdf",
          "image/png",
          "image/jpeg",
          "image/jpg",
        ].includes(file.type);
      },
      { error: "Please upload JPG, JPEG or PNG file" },
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024, // 5MB limit
      { error: "File size must be less than 5MB" },
    ),
});
