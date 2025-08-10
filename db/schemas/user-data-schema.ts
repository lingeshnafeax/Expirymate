import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { relations } from "drizzle-orm";
import { fileSchema } from "./file-data.schema";

export const userData = pgTable("user_data", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const userDataRelations = relations(userData, ({ one, many }) => ({
  user: one(user, {
    fields: [userData.userId],
    references: [user.id],
  }),
  files: many(fileSchema),
}));
