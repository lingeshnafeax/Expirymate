import { pgTable, uuid, text, pgEnum, date, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { FileCategories } from "@/constants";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { user } from "./auth-schema";

export const fileCategoryEnum = pgEnum("file_category", FileCategories);

export const fileSchema = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey(),
  uri: text("uri").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  fileCategory: fileCategoryEnum().notNull(),
  expiryDate: date("expiry_date").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  couponCode: text("coupon_code"),
  issuer: text("issuer"),
  issueDate: date("issue_date"),
  value: text("value"),
  discountInfo: text("discount_info"),

  otherInfo: jsonb("other_info").$type<string[]>(),
  termsAndCondition: jsonb("terms_and_condition").$type<string[]>(),
});

export const fileSchemaRelations = relations(fileSchema, ({ one }) => ({
  user: one(user, {
    fields: [fileSchema.userId],
    references: [user.id],
  }),
}));

export const insertFileSchema = createInsertSchema(fileSchema);

export const selectFileSchema = createSelectSchema(fileSchema);
