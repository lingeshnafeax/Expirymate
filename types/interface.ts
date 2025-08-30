import { IEncodedFileSchema } from "./types";

export interface IExternalApiService {
  uploadFileToS3: (data: IEncodedFileSchema) => Promise<{
    base64String: string;
    fileType: string;
    fileName: string;
  }>;
  scanFileWithGemini: (
    base64String: string,
    fileType: string,
  ) => Promise<unknown>;
  getSignedS3Url: ({
    fileName,
    expTimeMinutes,
  }: {
    fileName: string;
    expTimeMinutes?: number | undefined;
  }) => Promise<string>;
}
