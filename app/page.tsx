import BackgroundGradient from "@/components/ui/BackgroundGradient";
import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const page = async () => {
  const t = await getTranslations("homePage.heroSection");
  return (
    <div className="relative min-h-screen w-full">
      <BackgroundGradient />

      <div className="relative z-10 min-h-screen w-full">
        <div className="flex h-full flex-col items-center justify-center pt-12 text-center md:pt-16 lg:pt-24">
          <h1
            className="font-Outfit text-4xl font-extrabold md:text-6xl xl:text-7xl/18"
            dangerouslySetInnerHTML={{ __html: t("title") }}
          ></h1>
          <h3 className="font-Zain mt-6 text-xl/5 xl:mt-3 xl:text-2xl">
            {t("description")}
          </h3>
          <Link
            href={"/login"}
            className={clsx(
              buttonVariants({ variant: "default" }),
              "mt-8 text-xl font-semibold xl:p-6 xl:text-2xl",
            )}
          >
            {t("ctaButton.text")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
