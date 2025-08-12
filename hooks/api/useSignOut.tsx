"use client";
import { authClient } from "@/lib/auth/auth-client";
import { logger } from "@sentry/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useSignOut = () => {
  const router = useRouter();
  const mutationOptions = useMutation({
    mutationKey: ["signInWithEmailAndPassword"],
    mutationFn: async () => {
      const response = authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out buddy!");
          },
          onError: (ctx) => {
            toast.error("Oops something went wrong!");
            logger.error("Google sign in error", { context: ctx });
          },
        },
      });
      return response;
    },
    onSuccess: (ctx) => {
      if (ctx?.error) {
        toast.error(ctx.error.message);
      } else {
        router.push("/");
      }
    },
  });
  return { ...mutationOptions };
};

export default useSignOut;
