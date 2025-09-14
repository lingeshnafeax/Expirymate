import { IExternalApiService } from "@/types/interface";
import { IEncodedFileSchema } from "@/types/types";
import { splitBase64String } from "@/utils/helper";
import { fakeGeminiScanResponse } from "../data";

export class FakeExternalApiService implements IExternalApiService {
  async uploadFileToS3(data: IEncodedFileSchema) {
    const base64String = splitBase64String(data.base64);

    return {
      base64String,
      fileType: data.type,
      fileName: data.name,
    };
  }
  async scanFileWithGemini() {
    return fakeGeminiScanResponse;
  }
  async getSignedS3Url() {
    return "https://cdn.picodi.com/in/files/shop-description/k/kfc/kfc-promo-code.png?v=1895";
  }
}
