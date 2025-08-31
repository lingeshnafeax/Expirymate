"use client";

import { MAXIMUM_FILE_SIZE_KB } from "@/constants";
import imageCompression, {
  Options as CompressOptions,
} from "browser-image-compression";

export const fetchEventInfo = async (eventId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_INNGEST_BASE_URL}/v1/events/${eventId}/runs`,
  );
  const json = await response.json();
  return json.data;
};

export async function getRunOutput(eventId: string) {
  const runs = await fetchEventInfo(eventId);
  return runs;
}

export const compressFile = async (file: File) => {
  const compressOptions: CompressOptions = {
    maxSizeMB: MAXIMUM_FILE_SIZE_KB / 1024,
    useWebWorker: true,
    fileType: file.type,
  };
  const compressedFile = await imageCompression(file, compressOptions);
  return compressedFile;
};
