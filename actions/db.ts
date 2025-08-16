import { createFileSchema, fileSchema, user, userData } from "@/db";
import { db } from "@/lib/drizzle";
import { fakeDBFileCreationResponse } from "@/static/constants/stubs";
import { logger } from "better-auth";
import { eq } from "drizzle-orm";

export const createUserAfterAuth = async (id: string) => {
  const [userDataId] = await db
    .insert(userData)
    .values({ userId: id })
    .returning({ insertedId: userData.id });
  await db.update(user).set({ userDataId: userDataId.insertedId }).returning();
};

export const createUserFileData = async (
  data: unknown,
  userId: string,
  uri: string,
) => {
  if (process.env.NODE_ENV === "development") {
    return fakeDBFileCreationResponse;
  } else {
    const parsedData = createFileSchema
      .omit({ userDataId: true, uri: true })
      .safeParse(data);

    const userFileData = await db.query.userData.findFirst({
      where: eq(userData.userId, userId),
    });

    if (parsedData.success && userFileData) {
      const fileData = await db
        .insert(fileSchema)
        .values({
          ...parsedData.data,
          userDataId: userFileData.id,
          uri,
        })
        .returning();
      return fileData;
    } else {
      logger.error("Error creating user file data", {
        error: parsedData.error,
      });
      console.log(parsedData.error);
    }
  }
};

export const getUserFiles = async (userDataId: string) => {
  const userFileData = await db
    .select()
    .from(fileSchema)
    .where(eq(fileSchema.userDataId, userDataId));
  return userFileData;
};
