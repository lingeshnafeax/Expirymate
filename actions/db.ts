import { desc } from "drizzle-orm";
import { insertFileSchema, fileSchema } from "@/db";
import { db } from "@/lib/drizzle";
import { logger } from "@sentry/nextjs";
import { eq, gte, and } from "drizzle-orm";
import { formatDateForQuery } from "@/utils/helper";

export const createUserFileData = async (
  data: unknown,
  userId: string,
  uri: string,
) => {
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
    console.error(parsedData.error);
    throw new Error("Error parsing file data");
  }
};

export const getUserFiles = async (userId: string, limit?: number) => {
  const userFileData = await db.query.fileSchema.findMany({
    where: eq(fileSchema.userId, userId),
    orderBy: desc(fileSchema.expiryDate),
    ...(limit ? { limit } : {}),
  });

  return userFileData;
};

export const getExpiringFilesCount = async (userId: string) => {
  try {
    const totalFiles = await db
      .select()
      .from(fileSchema)
      .where(
        and(
          eq(fileSchema.userId, userId),
          gte(fileSchema.expiryDate, formatDateForQuery(new Date())),
        ),
      );
    return totalFiles.length;
  } catch (err) {
    console.error("Error fetching expiring files count:", err);
    return 0;
  }
};
