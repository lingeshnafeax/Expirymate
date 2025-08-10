"use client";
import { inngest } from "@/lib/inngest";
import { convertFiletoBase64 } from "@/lib/utils";
import { fileUploadSchema } from "@/validations/validation";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import useUser from "../useUser";
import { toast } from "sonner";
const useUploadFile = () => {
  const { data: userData } = useUser();

  const mutationOptions = useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: async (data: z.infer<typeof fileUploadSchema>) => {
      const base64 = await convertFiletoBase64(data.file);
      if (userData) {
        await inngest.send({
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
      }
    },
    onSuccess: () => {
      toast.success("File scanned!");
    },
    onError: () => {
      toast.error("Oops something went wrong!");
    },
  });
  return { ...mutationOptions };
};

export default useUploadFile;
