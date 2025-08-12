"use client";
import { authClient } from "@/lib/auth/auth-client";
import { signInWithEmailSchema } from "@/validations/validation";
import { logger } from "@sentry/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

const useLoginWithEmail = () => {
  const router = useRouter();
  const mutationOptions = useMutation({
    mutationKey: ["signInWithEmailAndPassword"],
    mutationFn: async (data: z.infer<typeof signInWithEmailSchema>) => {
      const response = await authClient.signIn.email(data, {
        onSuccess: () => {
          console.log("Sign in with email successful");
        },
        onError: (ctx) => {
          logger.error("Sign in with email error", { context: ctx });
          console.log("Sign in with email error", ctx);
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

export default useLoginWithEmail;
