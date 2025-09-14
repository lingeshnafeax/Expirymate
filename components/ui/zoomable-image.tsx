"use client";

import Image, { StaticImageData } from "next/image";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog";
import {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { Skeleton } from "./skeleton";

type ImageSource = string | StaticImageData | null;

interface ZoomableImageProps
  extends Omit<
    DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    "src" | "width" | "height"
  > {
  src: ImageSource | Blob;
  width?: number | `${number}`;
  height?: number | `${number}`;
}

function ImageWithLoading({
  src,
  alt,
  className,
  width = 500,
  height = 100,
  ...props
}: Omit<ZoomableImageProps, "src"> & { src: ImageSource | Blob }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<ImageSource>(null);

  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        setIsLoading(true);

        if (src instanceof Blob) {
          const url = URL.createObjectURL(src);
          setBlobUrl(url);
          setImageSrc(url);
        } else {
          setImageSrc(src);
        }
      } catch (error) {
        console.error("Error loading image:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();

    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [src]);

  if (isLoading || !imageSrc) {
    return (
      <div className={className}>
        <div className="relative h-96 w-full">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={imageSrc}
          alt={alt || ""}
          sizes="100vw"
          className={className}
          width={width}
          height={height}
          onLoadingComplete={() => setIsLoading(false)}
          {...props}
          unoptimized
        />
      </DialogTrigger>
      <DialogTitle className="sr-only">File attachment</DialogTitle>
      <DialogContent className="max-w-7xl border-0 bg-transparent p-0">
        <div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md bg-transparent shadow-md">
          <Image
            src={imageSrc}
            fill
            alt={alt || ""}
            className="h-full w-full object-contain"
            unoptimized
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ImageWithLoading;
