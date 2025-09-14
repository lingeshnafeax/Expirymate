import { getFileById } from "@/actions/db";
import { buttonVariants } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import CouponCode from "@/components/feature/Home/File/CouponCard";
import { StepBackIcon, Clock, Hourglass } from "lucide-react";
import { formatDistanceToNow, differenceInCalendarDays } from "date-fns";
import { cn } from "@/lib/utils";
import { FileAttachmentPreview } from "@/components/ui/file-attachment-preview";

const page = async ({ params }: { params: Promise<{ fileId: string }> }) => {
  const { fileId } = await params;
  const fileData = await getFileById(fileId);

  if (!fileData) {
    throw new Error("File not found");
  }

  const expiryDate = new Date(fileData.expiryDate);
  const isExpired = expiryDate < new Date();
  const daysDifference = differenceInCalendarDays(expiryDate, new Date());

  return (
    <section className={cn("pb-10", isExpired && "opacity-80")}>
      <div>
        <CardHeader className="flex flex-row items-center justify-between px-0 pb-2">
          {/* Back Button */}
          <Link
            href="/home"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <StepBackIcon className="h-4 w-4" />
          </Link>
        </CardHeader>

        <CardContent className="space-y-6 px-0">
          {/* Coupon + Expiry */}

          <div className="flex flex-col items-start gap-y-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col items-start gap-y-2">
              <span className="text-2xl font-semibold">{fileData.issuer}</span>
              <Badge
                variant={isExpired ? "destructive" : "default"}
                className="w-fit px-3 py-1 text-sm"
              >
                {isExpired ? "Expired" : fileData.fileCategory}
              </Badge>
            </div>

            <div
              className={cn(
                "flex items-center gap-2 text-sm",
                isExpired ? "text-destructive" : "text-muted-foreground",
              )}
            >
              {isExpired ? (
                <Clock className="h-4 w-4" />
              ) : (
                <Hourglass className="h-4 w-4" />
              )}
              <span>
                {isExpired
                  ? `Expired ${formatDistanceToNow(expiryDate, { addSuffix: true })}`
                  : `Expires in ${daysDifference} day${daysDifference !== 1 ? "s" : ""}`}
              </span>
            </div>

            <CouponCode
              code={fileData.couponCode!} // TODO: Have to fix this null later
            />
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="mb-1 text-lg font-semibold">Description</h3>
            <p className="text-muted-foreground">{fileData.description}</p>
          </div>

          {/* Value + Discount */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="bg-muted/40 rounded-lg p-4">
              <p className="text-muted-foreground text-sm">Value</p>
              <p className="text-xl font-semibold">{fileData.value}</p>
            </div>
            <div className="bg-muted/40 rounded-lg p-4">
              <p className="text-muted-foreground text-sm">Discount</p>
              <p className="text-xl font-semibold">{fileData.discountInfo}</p>
            </div>
          </div>

          {fileData.uri && (
            <FileAttachmentPreview
              fileUri={fileData.uri}
              alt={`Attachment for ${fileData.issuer}`}
            />
          )}

          {/* Terms & Conditions */}
          {fileData.termsAndCondition &&
            fileData.termsAndCondition?.length > 0 && (
              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  Terms & Conditions
                </h3>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5">
                  {fileData.termsAndCondition.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

          {/* Other Info */}
          {fileData.otherInfo && fileData.otherInfo?.length > 0 && (
            <div>
              <h3 className="mb-2 text-lg font-semibold">Other Information</h3>
              <ul className="text-muted-foreground list-disc space-y-1 pl-5">
                {fileData.otherInfo.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </div>
    </section>
  );
};

export default page;
