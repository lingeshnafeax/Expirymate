import { session, user } from "@/db";

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
