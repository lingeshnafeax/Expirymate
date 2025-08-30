import { FileCategories, S3_SIGNED_URL_EXPIRATION_TIME } from "@/constants";
import { gemini } from "@/lib/gemini";
import { s3 } from "@/lib/s3";
import { IExternalApiService } from "@/types/interface";
import { IEncodedFileSchema } from "@/types/types";
import { splitBase64String } from "@/utils/helper";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Type } from "@google/genai";
import { randomUUID } from "crypto";

export class ExternalApiService implements IExternalApiService {
  async uploadFileToS3(data: IEncodedFileSchema) {
    const base64String = splitBase64String(data.base64);

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

    return { base64String, fileType: data.type, fileName };
  }
  async scanFileWithGemini(base64String: string, fileType: string) {
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
          "You need to scan the file that is given to you and extract many informations from the file. The expiry date, file category are the most important. Send date in yyyy/mm/dd format.",

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
  }
  async getSignedS3Url({
    fileName,
    expTimeMinutes = S3_SIGNED_URL_EXPIRATION_TIME,
  }: {
    fileName: string;
    expTimeMinutes?: number;
  }) {
    const getSignedUrlCommand = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileName,
    });

    const signedUrl = await getSignedUrl(s3, getSignedUrlCommand, {
      expiresIn: expTimeMinutes,
    });
    return signedUrl;
  }
}
