"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { fileUploadSchema } from "@/validations/validation";
import z from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useUploadFile from "@/hooks/api/useUploadFile";

const Home = () => {
  const form = useForm<z.infer<typeof fileUploadSchema>>({
    resolver: zodResolver(fileUploadSchema),
  });

  const { mutateAsync: uploadFile, isPending } = useUploadFile();
  // const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onSubmit = async (data: z.infer<typeof fileUploadSchema>) => {
    await uploadFile(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("file", file);
      //   if (file.type.startsWith("image/")) { //TODO : Have to implement image preview
      //     setPreviewUrl(URL.createObjectURL(file));
      //   } else {
      //     setPreviewUrl(null); // No preview for PDFs
      //   }
      // }
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="file"
          render={() => (
            <FormItem className="grid gap-1">
              <FormLabel>Upload a file</FormLabel>
              <FormControl>
                <Input
                  onChange={handleFileChange}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit">
          {isPending ? "Uploading..." : "Upload"}
        </Button>
      </form>
    </Form>
  );
};

export default Home;
