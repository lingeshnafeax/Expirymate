import { insertFileSchema, fileSchema } from "@/db";
import { db } from "@/lib/drizzle";
import { fakeDBFileCreationResponse } from "@/constants/constants/stubs";
import { logger } from "@sentry/nextjs";
import { eq } from "drizzle-orm";

export const createUserFileData = async (
  data: unknown,
  userId: string,
  uri: string,
) => {
  if (process.env.NODE_ENV === "development") {
    return fakeDBFileCreationResponse;
  } else {
    try {
      const parsedData = insertFileSchema
        .omit({ userId: true, uri: true })
        .safeParse(data);

      if (parsedData.success) {
        const fileData = await db
          .insert(fileSchema)
          .values({
            ...parsedData.data,
            userId,
            uri,
          })
          .returning();
        return fileData;
      } else {
        logger.error("Error while parsing the file data.", {
          error: parsedData.error,
        });
        console.log(parsedData.error);
      }
    } catch (err) {
      logger.error("Error creating user file data", { error: err });
      console.log(err);
    }
  }
};

export const getUserFiles = async (userId: string) => {
  const userFileData = await db
    .select()
    .from(fileSchema)
    .where(eq(fileSchema.userId, userId));
  return userFileData;
};
