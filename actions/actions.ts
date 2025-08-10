import { s3 } from "@/lib/s3";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { IEncodedFileSchema } from "@/types/types";
import { logger } from "@sentry/nextjs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  FileCategories,
  S3_SIGNED_URL_EXPIRATION_TIME,
} from "@/static/constants/constants";
import { Type } from "@google/genai";
import { gemini } from "@/lib/gemini";
import { splitBase64String } from "@/lib/utils";

export const uploadFileToS3 = async (data: IEncodedFileSchema) => {
  try {
    const base64String = splitBase64String(data.base64);

    if (process.env.NODE_ENV === "development") {
      return {
        base64String,
        fileType: data.type,
        success: true,
        fileName: data.name,
      };
    } else {
      if (data.size > 5 * 1024 * 1024) {
        throw new Error("File size must be less than 5MB");
      }

      const buffer = Buffer.from(base64String, "base64");
      const fileExtension = data.name.split(".").pop();
      const fileName = `${randomUUID()}.${fileExtension}`;

      //Upload file to S3

      const uploadToS3Command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: fileName,
        Body: buffer,
        ContentType: data.type,
      });

      await s3.send(uploadToS3Command);

      return { success: true, base64String, fileType: data.type, fileName };
    }
  } catch (err) {
    logger.error("Error uploading file to S3", { error: err });
    console.log("Error uploading file to S3", err);
  }
};

export const scanFileWithGemini = async (
  base64String: string,
  fileType: string,
) => {
  try {
    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: fileType,
            data: base64String,
          },
        },
      ],
      config: {
        systemInstruction:
          "You need to scan the file that is given to you and extract many informations from the file. The expiry date, file category are the most important. Send date in dd/mm/yyyy format.",

        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fileCategory: {
              type: Type.STRING,
              enum: FileCategories,
            },
            expiryDate: { type: Type.STRING },
            title: { type: Type.STRING },
            description: { type: Type.STRING, nullable: true },
            couponCode: { type: Type.STRING, nullable: true },
            issuer: { type: Type.STRING, nullable: true },
            issueDate: { type: Type.STRING, nullable: true },
            value: { type: Type.STRING, nullable: true },
            discountInfo: { type: Type.STRING, nullable: true },
            otherInfo: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            termsAndCondition: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              nullable: true,
            },
          },
        },
      },
    });

    return JSON.parse(response.text!) as unknown;
  } catch (err) {
    logger.error("Error scanning file with gemini", { error: err });
    console.log("Error scanning file with gemini", err);
  }
};

export const getSignedS3Url = async ({
  fileName,
  expTimeMinutes = S3_SIGNED_URL_EXPIRATION_TIME,
}: {
  fileName: string;
  expTimeMinutes?: number;
}) => {
  const getSignedUrlCommand = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: fileName,
  });

  const signedUrl = await getSignedUrl(s3, getSignedUrlCommand, {
    expiresIn: expTimeMinutes,
  });
  return signedUrl;
};
