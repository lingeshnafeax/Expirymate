import { inngest } from "@/lib/inngest";

import { createUserFileData } from "./db";
import { externalApiService } from "@/service";
import { revalidatePath } from "next/cache";

export const scanPdf = inngest.createFunction(
  { id: "expiry.mate" },
  { event: "ai/scan.file" },
  async ({ event, step }) => {
    const fileData = await step.run("upload-to-s3", async () => {
      const response = await externalApiService.uploadFileToS3(event.data);
      return response;
    });
    const uploadFileToGemini = await step.run(
      // TODO: Handle PDF Upload
      "scan-file-with-gemini",
      async () => {
        const geminiResponse = await externalApiService.scanFileWithGemini(
          fileData.base64String,
          fileData.fileType,
        );
        return geminiResponse;
      },
    );
    await step.run("store-file-data-in-db", async () => {
      const [userFileData] =
        (await createUserFileData(
          uploadFileToGemini,
          event.user.userId,
          fileData.fileName,
        )) ?? [];
      revalidatePath("/home");
      return userFileData;
    });
  },
);
