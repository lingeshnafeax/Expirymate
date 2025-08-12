"use client";
import { authClient } from "@/lib/auth/auth-client";
import { logger } from "@sentry/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useSignInWithGmail = () => {
  const router = useRouter();
  const mutationOptions = useMutation({
    mutationKey: ["signInWithGoogle"],
    mutationFn: async () => {
      const response = await authClient.signIn.social(
        {
          provider: "google",
          callbackURL: "/login",
        },
        {
          onSuccess: async () => {
            console.log("Google sign in successful");
          },
          onError: (ctx) => {
            logger.error("Google sign in error", { context: ctx });
            console.log("Google sign in error", ctx);
          },
        },
      );
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

export default useSignInWithGmail;
