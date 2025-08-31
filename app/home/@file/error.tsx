"use client";
import Stars from "@/components/icons/Stars";
import { useTranslations } from "next-intl";

const Error = () => {
  const t = useTranslations("homePage.fileSection");
  return (
    <div className="flex flex-col items-center justify-center gap-0 sm:gap-2">
      <Stars className="max-h-52 max-w-52 sm:max-h-74 sm:max-w-74" />
      {t("error")}
    </div>
  );
};

export default Error;
