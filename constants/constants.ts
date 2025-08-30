import { AppRoutes, Roles } from "@/types/types";

export const FileCategories = ["Coupon Card", "Document", "Others"] as const;

export const S3_SIGNED_URL_EXPIRATION_TIME = 60 * 60; // 1 Hour

export enum APP_ROUTES {
  LANDING = "/",
  LOGIN = "/login",
  HOME = "/home",
  FORBIDDEN = "/forbidden",
}

export const ACCESS_CONTROL: Record<Roles, string[]> = {
  user: ["/home"] satisfies AppRoutes[],
  admin: ["/home"] satisfies AppRoutes[],
};

export const MAXIMUM_FILE_SIZE_KB = 120;

export const DEFAULT_NO_OF_FILES_TO_FETCH = 4;
