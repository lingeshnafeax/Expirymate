"use server";
import { fileUploadSchema } from "@/validations/validation";
import { convertFileToBase64, getUserServerSession } from "@/utils/server";
import z from "zod";
import { inngest } from "@/lib/inngest";

export const uploadFile = async (data: z.infer<typeof fileUploadSchema>) => {
  const userData = await getUserServerSession();
  const base64 = await convertFileToBase64(data.file);
  if (userData) {
    await inngest.send({
      name: "ai/scan.file",
      data: {
        name: data.file.name,
        type: data.file.type,
        size: data.file.size,
        base64,
      },
      user: {
        userId: userData?.user.id,
        email: userData?.user.email,
      },
    });
  } else {
    throw new Error("User not authenticated");
  }
};
