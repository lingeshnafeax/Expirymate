import FileFilter from "@/components/feature/Home/File/FileFilter";
import FileMoreButton from "@/components/feature/Home/File/FileMoreButton";
import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

export default async function Layout({
  children,
  file,
}: {
  children: ReactNode;
  file: ReactNode;
}) {
  const t = await getTranslations("homePage");
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-Gabarito text-xl">{t("fileSection.title")}</h3>
          <FileFilter />
          {/* <FileMoreButton /> */}
        </div>
        {file}
      </div>
      {children}
    </>
  );
}
