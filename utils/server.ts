"use server";
import { auth } from "@/lib/auth/better-auth";
import { headers } from "next/headers";

export const getUserServerSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
};

export const isUserLoggedIn = async () => {
  try {
    const userSession = await getUserServerSession();
    if (!userSession?.session || !userSession.user) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

export async function convertFileToBase64(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer.toString("base64");
}
