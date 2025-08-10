CREATE TABLE "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"uri" text NOT NULL,
	"user_data_id" uuid NOT NULL,
	"fileCategory" "file_category" NOT NULL,
	"expiry_date" date NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"coupon_code" text,
	"issuer" text,
	"issue_date" date,
	"value" text,
	"discount_info" text,
	"other_info" jsonb,
	"terms_and_condition" jsonb
);
--> statement-breakpoint
DROP TABLE "file_schema" CASCADE;--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_user_data_id_user_data_id_fk" FOREIGN KEY ("user_data_id") REFERENCES "public"."user_data"("id") ON DELETE cascade ON UPDATE no action;