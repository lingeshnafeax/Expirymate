import { FakeExternalApiService } from "@/stubs/services/FakeExternalApiService";
import { ExternalApiService } from "./ExternalApiService";

export const externalApiService =
  process.env.NODE_ENV === "development"
    ? new FakeExternalApiService()
    : new ExternalApiService();
