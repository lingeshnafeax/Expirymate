"use server";
import { auth } from "@/lib/auth/better-auth";
import { headers } from "next/headers";

export async function convertFileToBase64(file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

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
