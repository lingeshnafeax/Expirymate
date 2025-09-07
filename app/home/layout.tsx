import FileFilter from "@/components/feature/Home/File/FileFilter";
import { FileProvider } from "@/context/FileContext";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export default async function Layout({ children, file }: LayoutProps<"/home">) {
  const t = await getTranslations("homePage");
  return (
    <>
      <div className="space-y-2 sm:space-y-5">
        <FileProvider>
          <div className="flex flex-col items-start justify-between space-y-3 sm:flex-row sm:items-center sm:gap-x-5 md:gap-x-20 lg:gap-x-40">
            <h3 className="font-Gabarito text-xl text-nowrap">
              {t("fileSection.title")}
            </h3>
            <Suspense>
              <FileFilter />
            </Suspense>
            {/* <FileMoreButton /> */}
          </div>
          {file}
        </FileProvider>
      </div>
      {children}
    </>
  );
}
