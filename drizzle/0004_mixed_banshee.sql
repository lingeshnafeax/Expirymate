ALTER TABLE "user_data" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "user_data" CASCADE;--> statement-breakpoint
ALTER TABLE "files" RENAME COLUMN "user_data_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "files" DROP CONSTRAINT "files_user_data_id_user_data_id_fk";
--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;