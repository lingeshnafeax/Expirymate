"use client";
import { authClient } from "@/lib/auth/auth-client";
import { signUpWithEmailSchema } from "@/validations/validation";
import { logger } from "@sentry/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

const useSignUpWithEmail = () => {
  const router = useRouter();
  const mutationOptions = useMutation({
    mutationKey: ["signUpWithEmailAndPassword"],
    mutationFn: async (data: z.infer<typeof signUpWithEmailSchema>) => {
      const response = await authClient.signUp.email(data, {
        onSuccess: async () => {
          console.log("Sign up using email successful");
        },

        onError: (ctx) => {
          logger.error("Sign up using email error", { context: ctx });
          console.log("Sign up using email error", ctx);
        },
      });
      return response;
    },
    onSuccess: (ctx) => {
      if (ctx?.error) {
        toast.error(ctx.error.message);
      } else {
        router.push("/home");
      }
    },
  });
  return { ...mutationOptions };
};

export default useSignUpWithEmail;
