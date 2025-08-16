import { inngest } from "@/lib/inngest";
import { scanFileWithGemini, uploadFileToS3 } from "./actions";
import { createUserFileData } from "./db";

export const scanPdf = inngest.createFunction(
  { id: "expiry.mate" },
  { event: "ai/scan.file" },
  async ({ event, step }) => {
    const fileData = await step.run("upload-to-s3", async () => {
      const response = await uploadFileToS3(event.data);
      return response;
    });
    const uploadFileToGemini = await step.run(
      // TODO: Handle PDF Upload
      "scan-file-with-gemini",
      async () => {
        if (fileData && fileData.success) {
          const geminiResponse = await scanFileWithGemini(
            fileData.base64String,
            fileData.fileType,
          );
          return geminiResponse;
        }
      },
    );
    await step.run("store-file-data-in-db", async () => {
      if (fileData) {
        const [userFileData] =
          (await createUserFileData(
            uploadFileToGemini,
            event.user.external_id,
            fileData?.fileName,
          )) ?? [];
        return userFileData;
      }
      return { success: false, message: "Error creating user file data" };
    });
  },
);
