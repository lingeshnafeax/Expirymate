import { FileData } from "@/types/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { differenceInCalendarDays, formatDistanceToNow } from "date-fns";
import { Hourglass, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
interface FileCardProps {
  cardData: FileData;
  isExpired?: boolean;
}

const FileCard = ({ cardData, isExpired = false }: FileCardProps) => {
  const expiryDate = new Date(cardData.expiryDate);
  const daysDifference = differenceInCalendarDays(expiryDate, new Date());
  
  return (
    <Link 
      href={`/file/${cardData.id}`} 
      className={cn(
        "hover:cursor-pointer transition-opacity",
        isExpired && "opacity-60 hover:opacity-80"
      )}
    >
      <Card className={cn(
        "group rounded-3xl py-4 shadow-2xs transition-all hover:shadow-md sm:py-6 border-none",
        isExpired && "border-dashed"
      )}>
        <CardContent className="space-y-1.5 sm:space-y-3">
          <Badge 
            className={cn(
              "font-semibold",
              isExpired 
                ? "bg-destructive/10 text-destructive" 
                : "bg-primary/10 text-primary"
            )}
          >
            {isExpired ? 'Expired' : cardData.fileCategory}
          </Badge>
          <div>
            <CardHeader className="px-0 text-xl font-semibold">
              {cardData.issuer}
            </CardHeader>
            <CardDescription className={cn(isExpired && "opacity-70")}>
              {cardData.description}
            </CardDescription>
          </div>

          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-x-1">
              {isExpired ? (
                <Clock className="text-destructive h-3.5 w-3.5" />
              ) : (
                <Hourglass className="text-foreground/60 h-3.5 w-3.5" />
              )}
              <span className={cn(
                "mt-1 text-lg font-semibold",
                isExpired && "text-destructive"
              )}>
                {isExpired 
                  ? `Expired ${formatDistanceToNow(expiryDate, { addSuffix: true })}`
                  : `${daysDifference} day${daysDifference !== 1 ? 's' : ''} left`}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default FileCard;
