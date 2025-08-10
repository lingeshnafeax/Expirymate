"use client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "./auth-config";
import { IEmailSignIn, IEmailSignUp } from "@/types/types";
import { toast } from "sonner";
import { logger } from "@sentry/nextjs";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
});

const signInWithGoogle = async () => {
  await authClient.signIn.social(
    {
      provider: "google",
      callbackURL: "/home",
    },
    {
      onSuccess: async (ctx) => {
        toast.success("Damn bro! Google let you in.");
        logger.info("Google sign in successful", { context: ctx });
        console.log("Google sign in successful", ctx);
      },
      onRequest: () => {
        logger.info("Google sign in request initiated");
        console.log("Google sign in request initiated");
      },
      onError: (ctx) => {
        toast.error("Oops something went wrong!");
        logger.error("Google sign in error", { context: ctx });
        console.log("Google sign in error", ctx);
      },
    },
  );
};

const signUpWithEmailAndPassword = async (props: IEmailSignUp) => {
  await authClient.signUp.email(
    {
      ...props,
    },
    {
      onSuccess: async (ctx) => {
        toast.success("Let's goo! You are now registered.");
        logger.info("Sign up using email successful", { context: ctx });
        console.log("Sign up using email successful", ctx);
      },
      onRequest: () => {
        logger.info("Sign up using email request initiated");
        console.log("Sign up using email request initiated");
      },
      onError: (ctx) => {
        toast.error("Oops something went wrong!");
        logger.error("Sign up using email error", { context: ctx });
        console.log("Sign up using email error", ctx);
      },
    },
  );
};

const signInWithEmailAndPassword = async (props: IEmailSignIn) => {
  await authClient.signIn.email(
    {
      ...props,
      callbackURL: "/home",
    },
    {
      onSuccess: (ctx) => {
        toast.success("Looks like someone remembers their password.");
        logger.info("Sign in with email successful", { context: ctx });
        console.log("Sign in with email successful", ctx);
      },
      onRequest: () => {
        logger.info("Sign in with email request initiated");
        console.log("Sign in with email request initiated");
      },

      onError: (ctx) => {
        toast.error("Oops something went wrong!");
        logger.error("Sign in with email error", { context: ctx });
        console.log("Sign in with email error", ctx);
      },
    },
  );
};

const signOut = async () => {
  authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        toast.success("Logged out buddy!");
      },
      onError: () => {
        toast.error("Oops something went wrong!");
      },
    },
  });
};

export {
  signInWithGoogle,
  signUpWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
};
