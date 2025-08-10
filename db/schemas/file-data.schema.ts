import { pgTable, uuid, text, pgEnum, date, jsonb } from "drizzle-orm/pg-core";
import { userData } from "./user-data-schema";
import { relations } from "drizzle-orm";
import { FileCategories } from "@/static/constants/constants";
import { createInsertSchema } from "drizzle-zod";

export const fileCategoryEnum = pgEnum("file_category", FileCategories);

export const fileSchema = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey(),
  uri: text("uri").notNull(),
  userDataId: uuid("user_data_id")
    .notNull()
    .references(() => userData.id, { onDelete: "cascade" }),

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
  userData: one(userData, {
    fields: [fileSchema.userDataId],
    references: [userData.id],
  }),
}));

export const createFileSchema = createInsertSchema(fileSchema);
