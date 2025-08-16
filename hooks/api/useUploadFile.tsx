"use client";
import { inngest } from "@/lib/inngest";
import { convertFileToBase64 } from "@/utils/server";
import { fileUploadSchema } from "@/validations/validation";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import useUser from "../useUser";
import { toast } from "sonner";
import { fetchEventInfo } from "@/utils/client";
const useUploadFile = () => {
  const { data: userData } = useUser();

  const mutationOptions = useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: async (data: z.infer<typeof fileUploadSchema>) => {
      const base64 = await convertFileToBase64(data.file);
      if (userData) {
        const { ids } = await inngest.send({
          name: "ai/scan.file",
          data: {
            name: data.file.name,
            type: data.file.type,
            size: data.file.size,
            base64,
          },
          user: {
            external_id: userData?.user.id,
            email: userData?.user.email,
          },
        });

        const eventStatus = await fetchEventInfo(ids[0]);
        return eventStatus;
      }
    },
    onSuccess: () => {
      toast.success(
        "File scanned!. It will be  available in your files section in a minute.",
      );
    },
    onError: () => {
      toast.error("Oops something went wrong!");
    },
  });
  return { ...mutationOptions };
};

export default useUploadFile;
