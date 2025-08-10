import { createFileSchema, fileSchema, user, userData } from "@/db";
import { db } from "@/lib/drizzle";
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
    logger.error("Error creating user file data", { error: parsedData.error });
    console.log(parsedData.error);
  }
};
