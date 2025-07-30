"use client";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL!,
});

const signInWithGoogle = async () => {
  const { data, error } = await authClient.signIn.social(
    {
      provider: "google",
    },
    {
      onSuccess: (ctx) => {
        console.log("Sign in successful:", console.dir(ctx));
      },
      onRequest: (ctx) => {
        console.log("Sign in request initiated");
      },
      onError: (ctx) => {
        console.error("Sign in error:", ctx);
      },
    },
  );
};

export { signInWithGoogle };
