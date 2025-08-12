import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../drizzle";
import * as authSchema from "@/db/index";
import { Roles } from "@/types/types";
import { createUserAfterAuth } from "@/actions/db";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...authSchema,
    },
  }),
  logger: {
    disabled: false,
    level: "debug",
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await createUserAfterAuth(user.id);
        },
      },
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user" satisfies Roles,
        description: "The role of the user in the system",
        input: false,
      },
      userDataId: {
        type: "string",
        defaultValue: "",
        required: false,
        descriptipn: "The id of table that stores all the user data.",
        input: false,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
