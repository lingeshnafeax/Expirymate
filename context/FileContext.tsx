"use client";
import { fetchFileQueryParamsSchema } from "@/validations/validation";
import { createContext, PropsWithChildren, useState } from "react";
import z from "zod";

type FileFilterType = z.infer<typeof fetchFileQueryParamsSchema> & {
  setCategory: (category: FileFilterType["category"]) => void;
  setStartDate: (startDate: FileFilterType["startDate"]) => void;
  setEndDate: (endDate: FileFilterType["startDate"]) => void;
  setSearchString: (searchString: FileFilterType["searchString"]) => void;
};

export const defaultFileFilters = {
  category: "All",
  searchString: "",
} as const;

const FileContext = createContext<FileFilterType>({
  ...defaultFileFilters,
  setCategory: () => {},
  setStartDate: () => {},
  setEndDate: () => {},
  setSearchString: () => {},
});

export default FileContext;

export const FileProvider = (props: PropsWithChildren) => {
  const [category, setCategory] = useState<FileFilterType["category"]>("All");
  const [startDate, setStartDate] = useState<FileFilterType["startDate"]>();
  const [endDate, setEndDate] = useState<FileFilterType["startDate"]>();
  const [searchString, setSearchString] =
    useState<FileFilterType["searchString"]>("");
  return (
    <FileContext.Provider
      value={{
        category,
        startDate,
        endDate,
        searchString,
        setCategory,
        setStartDate,
        setEndDate,
        setSearchString,
      }}
    >
      {props.children}
    </FileContext.Provider>
  );
};
