import { asc, ilike, lte } from "drizzle-orm";
import { insertFileSchema, fileSchema } from "@/db";
import { db } from "@/lib/drizzle";
import { logger } from "@sentry/nextjs";
import { eq, gte, and } from "drizzle-orm";
import { formatDateForQuery, parseError } from "@/utils/helper";
import { fetchFileQueryParamsSchema } from "@/validations/validation";
import z from "zod";

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

export const getUserFiles = async (
  userId: string,
  filters: z.infer<typeof fetchFileQueryParamsSchema>,
) => {
  try {
    const conditions = [eq(fileSchema.userId, userId)];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (filters.category && filters.category !== "All") {
      conditions.push(eq(fileSchema.fileCategory, filters.category));
    }

    if (filters.startDate) {
      conditions.push(
        gte(fileSchema.expiryDate, formatDateForQuery(filters.startDate)),
      );
    }

    if (filters.endDate) {
      conditions.push(
        lte(fileSchema.expiryDate, formatDateForQuery(filters.endDate)),
      );
    }

    if (filters.searchString) {
      conditions.push(ilike(fileSchema.issuer, `%${filters.searchString}%`));
    }

    const allFiles = await db.query.fileSchema.findMany({
      where: and(...conditions),
      orderBy: asc(fileSchema.expiryDate),
    });

    // Separate expired and expiring files
    const expiredFiles = allFiles.filter(file => new Date(file.expiryDate) < today);
    const expiringFiles = allFiles.filter(file => new Date(file.expiryDate) >= today);

    return {
      expired: expiredFiles,
      expiring: expiringFiles
    };
  } catch (err) {
    console.error("Error fetching user files:", parseError(err));
    return { expired: [], expiring: [] };
  }
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
    logger.error("Error fetching expiring files count", parseError(err));
    return 0;
  }
};

export const getFileById = (fileId: string) => {
  try {
    return db.query.fileSchema.findFirst({
      where: eq(fileSchema.id, fileId),
    });
  } catch (err) {
    console.error("Error fetching file by id:", parseError(err));
    logger.error("Error fetching file by id", parseError(err));
  }
};
