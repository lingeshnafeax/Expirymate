import { getUserFiles } from "@/actions/db";
import { getUserServerSession } from "@/utils/server";
import FileCard from "@/components/feature/Home/File/FileCard";
import { fetchFileQueryParamsSchema } from "@/validations/validation";
import { getTranslations } from "next-intl/server";
import Stars from "@/components/icons/Stars";
import { defaultFileFilters } from "@/context/FileContext";
import { Badge } from "@/components/ui/badge";

const page = async (props: PageProps<"/home">) => {
  const t = await getTranslations("homePage.fileSection");
  const session = await getUserServerSession();
  const filters = await props.searchParams;
  const parsedFilters = fetchFileQueryParamsSchema.safeParse(filters);

  const { expiring, expired } = await getUserFiles(
    session!.user?.id, //? Asserting here since this logic is already handled in middleware
    parsedFilters.success ? parsedFilters.data : defaultFileFilters,
  );

  const hasExpiring = expiring.length > 0;
  const hasExpired = expired.length > 0;
  const totalFiles = expiring.length + expired.length;

  return (
    <div className="space-y-8">
      {totalFiles > 0 ? (
        <>
          {hasExpiring && (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Expiring Soon</h2>
              <div className="grid grid-rows-2 gap-3 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
                {expiring.map((file) => (
                  <FileCard key={file.id} cardData={file} isExpired={false} />
                ))}
              </div>
            </section>
          )}

          {hasExpired && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Expired</h2>
                <Badge variant="outline" className="sm:hidden">
                  {expired.length} expired
                </Badge>
              </div>
              <div className="grid grid-rows-2 gap-3 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
                {expired.map((file) => (
                  <FileCard key={file.id} cardData={file} isExpired={true} />
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="flex w-full flex-col items-center justify-center gap-0 text-center sm:gap-2">
          <Stars className="max-h-52 max-w-52 sm:max-h-74 sm:max-w-74" />
          {t("empty")}
        </section>
      )}
    </div>
  );
};

export default page;
