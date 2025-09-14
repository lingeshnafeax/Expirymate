"use client";

import { CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const FileLoading = () => {
  return (
    <section className="pb-10">
      <div>
        {/* Header with back button */}
        <CardHeader className="px-0 pb-6">
          <Skeleton className="h-9 w-9 rounded-md" />
        </CardHeader>

        <CardContent className="space-y-6 px-0">
          {/* Issuer and Category */}
          <div className="flex flex-col items-start gap-y-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col items-start gap-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-5 w-40" />
            </div>
          </div>

          <Separator />

          {/* Value and Discount */}
          <div className="grid gap-4 sm:grid-cols-2">
            {['Value', 'Discount'].map((label) => (
              <div key={label} className="space-y-2 rounded-lg bg-muted/40 p-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </div>

          {/* File Preview Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-48 w-full max-w-xs rounded-md" />
          </div>

          {/* Terms & Conditions */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Skeleton className="mt-1 h-3 w-3 flex-shrink-0 rounded-full" />
                  <Skeleton className="h-4 w-full max-w-md" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </div>
    </section>
  );
};

export default FileLoading;
