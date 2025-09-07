"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { useContext, useEffect, useState } from "react";
import {
  fileCategoriesForFiltering,
  FileUploadAvailableDates,
} from "@/constants/constants";
import { type DateRange } from "react-day-picker";
import { format, isSameDay } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FileContext from "@/context/FileContext";
import { fetchFileQueryParamsSchema } from "@/validations/validation";
import clsx from "clsx";
import { useTranslations } from "next-intl";

const FileFilter = () => {
  const t = useTranslations("homePage.fileSection.filter");

  const { category, searchString, setSearchString, setCategory } =
    useContext(FileContext);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Setting filter values to QueryParams
  const setFilters = () => {
    const urlParams = new URLSearchParams();
    urlParams.set("category", category);

    if (searchString.length > 0) {
      urlParams.set("searchString", searchString);
    }

    if (dateRange?.from && dateRange?.to) {
      const startDay = format(dateRange.from, "yyyy-MM-dd");
      urlParams.set("startDate", startDay);

      if (isSameDay(startDay, dateRange.to)) {
        urlParams.set("endDate", startDay);
      } else {
        urlParams.set("endDate", format(dateRange.to, "yyyy-MM-dd"));
      }
    }

    setIsFilterOpen(false);

    router.push(`${pathname}?${urlParams.toString()}` as never); //! This is a bug in NextJS
  };

  //Reset query params is anyone of them is invalid
  const resetFilters = () => {
    const urlParams = new URLSearchParams();

    setSearchString("");
    setCategory("All");
    setDateRange(undefined);

    router.replace(`${pathname}?${urlParams.toString()}` as never); //! This is a bug in NextJS
  };

  useEffect(() => {
    const queryParams = Object.fromEntries(searchParams);
    const parsedQueryParams = fetchFileQueryParamsSchema.safeParse(queryParams);

    // Setting filter values based on Query params
    if (parsedQueryParams.success) {
      const {
        data: { category, searchString, startDate, endDate },
      } = parsedQueryParams;
      setCategory(category);
      setSearchString(searchString);

      if (startDate && endDate) {
        setDateRange({
          from: new Date(startDate),
          to: new Date(endDate),
        });
      }
    } else {
      resetFilters();
    }
  }, []);

  return (
    <div className="flex w-full flex-col items-start justify-end gap-3 sm:flex-row sm:items-center sm:justify-end sm:self-auto lg:gap-x-5">
      <div className="flex w-full flex-1 items-center gap-x-3 sm:flex-initial">
        <Input
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          type="text"
          placeholder="Coupon Name"
        ></Input>
        <Search onClick={setFilters} />
      </div>
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetTrigger asChild>
          <Button
            variant={"outline"}
            className={clsx(
              "relative",
              dateRange &&
                (dateRange.from || dateRange.to) &&
                "after:text-destructive relative after:absolute after:-top-7.5 after:-right-0 after:animate-pulse after:text-5xl after:content-['.']",
            )}
          >
            <SlidersHorizontal />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full">
          <SheetHeader className="space-y-6">
            <div>
              <SheetTitle className="sm text-2xl font-semibold">
                {t("title")}
              </SheetTitle>
              <SheetDescription>{t("description")}</SheetDescription>
            </div>
            <div className="space-y-3">
              <Label htmlFor="file-category">{t("category")}</Label>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent id="file-category">
                  <SelectGroup>
                    {fileCategoriesForFiltering.map((category, i) => {
                      return (
                        <SelectItem value={category} key={i}>
                          {category}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex min-w-0 flex-col items-center gap-2">
              <Label htmlFor="from-date" className="self-start">
                {t("period")}
              </Label>
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={1}
                startMonth={FileUploadAvailableDates.startDate}
                endMonth={FileUploadAvailableDates.endDate}
                className="rounded-lg border shadow-sm"
              />
              {dateRange?.from && dateRange.to && (
                <div className="text-muted-foreground text-center text-xs">
                  {isSameDay(dateRange.from, dateRange.to)
                    ? `${format(dateRange.from, "PP")}`
                    : `${format(dateRange.from, "PP")} - ${format(dateRange.to, "PP")}`}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <Button
                variant={"outline"}
                onClick={() => {
                  setIsFilterOpen(false);
                  resetFilters();
                }}
              >
                {t("reset")}
              </Button>
              <Button className="w-fit" onClick={setFilters}>
                <Sparkles />
                {t("apply")}
              </Button>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FileFilter;
