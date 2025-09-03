import Connection from "@/components/icons/Connection";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { EXTERNAL_LINKS } from "@/constants";
import clsx from "clsx";
import { Heart, MoveRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const page = async () => {
  const t = await getTranslations("landingPage.heroSection");
  return (
    <>
      <div className="flex h-full w-full flex-1 flex-col justify-between">
        <div className="flex h-full flex-col items-start pt-6 md:pt-12 lg:pt-22">
          <Badge
            variant={"outline"}
            className="animate-pulse text-xs sm:px-3 sm:text-sm"
          >
            Coming Soon!
          </Badge>
          <h1
            className="font-Outfit mt-3 mb-5 text-5xl font-semibold sm:mt-3 md:text-6xl lg:text-7xl/18 lg:font-extrabold"
            dangerouslySetInnerHTML={{ __html: t("title") }}
          ></h1>
          <h3
            className="font-Zain mt-2 text-lg/5 sm:text-xl/5 lg:text-2xl/7"
            dangerouslySetInnerHTML={{ __html: t("description") }}
          ></h3>
          <Link
            href={"/login"}
            className={clsx(
              buttonVariants({ variant: "default", size: "lg" }),
              "mt-6 font-semibold sm:text-xl lg:mt-8 lg:p-5",
            )}
          >
            {t("ctaButton.text")}
            <MoveRight />
          </Link>
        </div>
        <p className="mb-4 flex items-center justify-end gap-x-1 text-sm sm:justify-start md:mb-6">
          Made with <Heart height={10} width={10} className="text-secondary" />{" "}
          by{" "}
          <a
            href={EXTERNAL_LINKS.GITHUB}
            className="animate-bounce"
            target="_blank"
          >
            Lingesh
          </a>
        </p>
      </div>
      <Connection className="fixed right-5 bottom-5 -z-10 max-h-[300px] min-h-[250px] sm:right-10 sm:bottom-10 sm:max-h-[400px] sm:max-w-[500px] lg:max-h-[500px] lg:max-w-[600px]" />
    </>
  );
};

export default page;
