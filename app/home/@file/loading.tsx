"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="my-4 grid gap-6 md:grid-cols-2">
      {Array.from({ length: 2 }, (_, i) => i + 1).map((_, i) => (
        <Card key={i}>
          <CardContent className="flex flex-row justify-between rounded-xl">
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-[150px]"></Skeleton>
                <Skeleton className="h-5 w-[100px]"></Skeleton>
              </div>
              <Skeleton className="h-4 w-[250px]"></Skeleton>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Skeleton className="h-4 w-[50px]"></Skeleton>
              <Skeleton className="h-10 w-[40px]"></Skeleton>
              <Skeleton className="h-4 w-[40px]"></Skeleton>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default loading;
