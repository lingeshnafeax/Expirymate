import { FileData } from "@/types/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { differenceInCalendarDays } from "date-fns";
import { Hourglass, MoveRight } from "lucide-react";
import Link from "next/link";
const FileCard = ({ cardData }: { cardData: FileData }) => {
  return (
    <Card className="group rounded-3xl py-4 shadow-2xs transition-shadow hover:shadow-md sm:py-6">
      <CardContent className="space-y-1.5 sm:space-y-3">
        <Badge className="text-primary bg-primary/10 font-semibold">
          {cardData.fileCategory}
        </Badge>
        <div className="">
          <CardHeader className="px-0 text-xl font-semibold">
            {cardData.issuer}
          </CardHeader>
          <CardDescription>{cardData.description}</CardDescription>
        </div>

        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-x-1">
            <Hourglass className="text-foreground/60 h-3.5 w-3.5" />
            <span className="mt-1 text-lg font-semibold">
              {differenceInCalendarDays(
                new Date(cardData.expiryDate),
                new Date(),
              )}{" "}
              days
            </span>
          </div>
          {/* // TODO: Link to file detail page  */}
          <Link
            href={`/file/${cardData.id}`}
            className="text-secondary group-hover:animate-in hidden flex-row items-center gap-x-2 font-semibold group-hover:flex"
          >
            View <MoveRight />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileCard;
