import { session, user } from "@/db";

type User = typeof user.$inferInsert;
type Session = typeof session.$inferInsert;

export type Roles = "user" | "admin";

export interface IAuthProvider {
  user: User;
  session: Session;
}

interface IEmailAuth {
  email: string;
  password: string;
}

export interface IEmailSignUp extends IEmailAuth {
  name: string;
  image?: string;
}

export interface IEmailSignIn extends IEmailAuth {
  rememberMe?: boolean;
}
