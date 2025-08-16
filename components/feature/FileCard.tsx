import { FileCardProps } from "@/types/types";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { differenceInCalendarDays } from "date-fns";
const FileCard = ({ cardData }: { cardData: FileCardProps }) => {
  return (
    <Card>
      <CardContent className="flex flex-row justify-between">
        <div className="space-y-3">
          <div className="">
            <CardHeader className="text-xl font-semibold px-0 ">
              {cardData.issuer}
            </CardHeader>
            <Badge>{cardData.fileCategory}</Badge>
          </div>
          <CardDescription>{cardData.description}</CardDescription>
        </div>
        <div>
          <span>Expires in</span>
          <div className="flex flex-col items-end">
            <p className="text-right text-2xl font-semibold">
              {differenceInCalendarDays(
                new Date(),
                new Date(cardData.expiryDate),
              )}
            </p>
            <span className="-mt-2">days</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileCard;
