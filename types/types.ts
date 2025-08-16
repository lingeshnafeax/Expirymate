import { insertFileSchema, session, user } from "@/db";
import { APP_ROUTES } from "@/static/constants/constants";
import z from "zod";

type User = typeof user.$inferInsert;
type Session = typeof session.$inferInsert;

export type Roles = "user" | "admin";

export interface IAuthProvider {
  user: User;
  session: Session;
}

type InngestDataType<T> = {
  data: T;
  user: {
    external_id: string;
    email: string;
  };
};

export type InngestEvents = {
  "ai/scan.file": InngestDataType<IEncodedFileSchema>;
};

export interface IEncodedFileSchema {
  name: string;
  type: string;
  size: number;
  base64: string;
}

export type FileCardProps = z.infer<typeof insertFileSchema>;

export type AppRoutes = `${APP_ROUTES}`;
