import ZoomableImage from "./zoomable-image";
import { externalApiService } from "@/service";
interface FileAttachmentPreviewProps {
  fileUri: string;
  alt: string;
}

export async function FileAttachmentPreview({
  fileUri,
  alt,
}: FileAttachmentPreviewProps) {
  if (!fileUri) {
    return null;
  }

  try {
    const signedUrl = await externalApiService.getSignedS3Url({
      fileName: fileUri,
    });

    if (!signedUrl) {
      return null;
    }

    return (
      <div className="mt-4">
        <h3 className="mb-2 text-lg font-semibold">File</h3>
        <div className="max-w-xs">
          <ZoomableImage
            src={signedUrl}
            alt={alt}
            className="rounded-md border"
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in FileAttachmentPreview:", error);
    return null;
  }
}
