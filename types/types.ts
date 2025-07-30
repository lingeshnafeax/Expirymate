import { session, user } from "@/db";

type User = typeof user.$inferInsert;
type Session = typeof session.$inferInsert;

export interface IAuthProvider {
  user: User;
  session: Session;
}
