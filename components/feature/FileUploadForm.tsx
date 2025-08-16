"use client";
import { useState } from "react";
import { fileUploadSchema } from "@/validations/validation";
import z from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useUploadFile from "@/hooks/api/useUploadFile";
import { FileIcon, Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { toast } from "sonner";
const FileUploadForm = () => {
  const form = useForm<z.infer<typeof fileUploadSchema>>({
    resolver: zodResolver(fileUploadSchema),
  });

  //? Component is cluttered with 2 file logic for both react hooks form and file upload component

  const [fileUploadDialogOpen, setFileUploadDialogOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const { mutateAsync: uploadFile, isPending } = useUploadFile();

  const onFileReject = (_: File, message: string) => {
    toast.error(message);
  };

  const handleFileChange = (file: File[]) => {
    form.clearErrors();
    setFiles(file);

    if (file) {
      form.setValue("file", file[0]); //! Change when doing multi file logic
    }
  };

  const onSubmit = async (data: z.infer<typeof fileUploadSchema>) => {
    await uploadFile(data);
    setFileUploadDialogOpen(false);
    form.reset();
    setFiles([]);
  };
  return (
    <>
      <Dialog
        open={fileUploadDialogOpen}
        onOpenChange={setFileUploadDialogOpen}
      >
        <DialogContent>
          <DialogHeader className="gap-0">
            <DialogTitle>Upload the file</DialogTitle>
            <DialogDescription className="text-lg">
              Let the AI do all the work.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem className="mb-4 grid gap-1">
                    <FormLabel className="sr-only">Upload a file</FormLabel>
                    <FormControl>
                      <FileUpload
                        accept=".pdf,.jpg,.jpeg,.png"
                        maxFiles={1}
                        // maxSize={5 * 1024 * 1024} // ? Commenting it Since it will be handled by zod
                        className="w-full max-w-md"
                        value={files}
                        onValueChange={handleFileChange}
                        onFileReject={onFileReject}
                      >
                        <FileUploadDropzone>
                          <div className="flex flex-col items-center text-center">
                            <div className="flex items-center justify-center rounded-full border p-2.5">
                              <Upload className="text-muted-foreground size-6" />
                            </div>
                            <FormDescription className="text-foreground text-lg font-semibold">
                              Drag & drop files here
                            </FormDescription>

                            <FormDescription>
                              We currently support pdf, png, jpg.
                            </FormDescription>
                          </div>
                          <FileUploadTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2 w-fit"
                            >
                              Browse files
                            </Button>
                          </FileUploadTrigger>
                        </FileUploadDropzone>
                        <FileUploadList>
                          {files.map((file, index) => (
                            <FileUploadItem key={index} value={file}>
                              <FileUploadItemPreview />
                              <FileUploadItemMetadata />
                              <FileUploadItemDelete
                                onClick={() => {
                                  form.clearErrors();
                                }}
                                asChild
                              >
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-7"
                                >
                                  <X />
                                </Button>
                              </FileUploadItemDelete>
                            </FileUploadItem>
                          ))}
                        </FileUploadList>
                      </FileUpload>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isPending}
                type="submit"
                className="w-full text-xl font-semibold"
              >
                {isPending ? "Processing..." : "Submit"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Button
        variant={"secondary"}
        onClick={() => {
          setFileUploadDialogOpen(true);
        }}
        asChild
        className="fixed right-5 bottom-5 rounded-full lg:right-72"
      >
        <FileIcon className="h-12 w-12 lg:h-15 lg:w-15" />
      </Button>
    </>
  );
};

export default FileUploadForm;
