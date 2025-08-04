"use client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "./auth-config";
import { IEmailSignIn, IEmailSignUp } from "@/types/types";
import { toast } from "sonner";

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
      onSuccess: (ctx) => {
        toast.success("Damn bro! Google let you in.");
        console.log("Sign in successful:", console.dir(ctx));
      },
      onRequest: () => {
        console.log("Sign in request initiated");
      },
      onError: (ctx) => {
        toast.error("Oops something went wrong!");
        console.error("Sign in error:", ctx);
      },
    },
  );
};

const signUpWithEmailAndPassword = async (props: IEmailSignUp) => {
  await authClient.signUp.email(
    {
      callbackURL: "/home",
      ...props,
    },
    {
      onSuccess: (ctx) => {
        toast.success("Let's goo! You are now registered.");
        console.log("Sign in successful:", console.dir(ctx));
      },
      onRequest: () => {
        console.log("Sign in request initiated");
      },
      onError: (ctx) => {
        toast.error("Oops something went wrong!");
        console.error("Sign in error:", ctx);
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
        console.log("Sign in successful:", console.dir(ctx));
      },
      onRequest: () => {
        console.log("Sign in request initiated");
      },

      onError: (ctx) => {
        toast.error("Oops something went wrong!");
        console.error("Sign in error:", ctx);
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
