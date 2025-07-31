"use client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "./auth-config";
import { IEmailSignIn, IEmailSignUp } from "@/types/types";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL!,
  plugins: [inferAdditionalFields<typeof auth>()],
});

const signInWithGoogle = async () => {
  await authClient.signIn.social(
    {
      provider: "google",
    },
    {
      onSuccess: (ctx) => {
        console.log("Sign in successful:", console.dir(ctx));
      },
      onRequest: () => {
        console.log("Sign in request initiated");
      },
      onError: (ctx) => {
        console.error("Sign in error:", ctx);
      },
    },
  );
};

export const signUpWithEmailAndPassword = async (props: IEmailSignUp) => {
  await authClient.signUp.email(
    {
      ...props,
    },
    {
      onSuccess: (ctx) => {
        console.log("Sign in successful:", console.dir(ctx));
      },
      onRequest: () => {
        console.log("Sign in request initiated");
      },
      onError: (ctx) => {
        console.error("Sign in error:", ctx);
      },
    },
  );
};

export const signInWithEmailAndPassword = async (props: IEmailSignIn) => {
  await authClient.signIn.email(
    {
      ...props,
    },
    {
      onSuccess: (ctx) => {
        console.log("Sign in successful:", console.dir(ctx));
      },
      onRequest: () => {
        console.log("Sign in request initiated");
      },
      onError: (ctx) => {
        console.error("Sign in error:", ctx);
      },
    },
  );
};

export { signInWithGoogle };
