"use client";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="my-4 grid gap-6 md:grid-cols-2">
      {Array.from({ length: 3 }, (_, i) => i + 1).map((_, i) => (
        <Card key={i} className="animate-pulse rounded-3xl">
          <CardContent className="space-y-3">
            {/* Badge */}
            <Skeleton className="h-5 w-[20%] rounded-full" />

            {/* Title + Description */}
            <div className="space-y-2">
              <CardHeader className="px-0">
                <Skeleton className="h-6 w-[40%]" />
              </CardHeader>
              <CardDescription>
                <Skeleton className="h-4 w-[60%]" />
              </CardDescription>
            </div>

            {/* Days + View button row */}
            <div className="flex flex-row items-center justify-between">
              {/* Days */}
              <div className="flex flex-row items-center gap-x-2">
                <Skeleton className="h-6 w-6 rounded-full" />{" "}
                {/* Icon placeholder */}
                <Skeleton className="h-6 min-w-10 sm:min-w-20" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default loading;
