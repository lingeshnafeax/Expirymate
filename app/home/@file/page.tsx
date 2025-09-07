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

  const userFiles = await getUserFiles(
    session!.user?.id, //? Asserting here since this logic is already handled in middleware
    parsedFilters.success ? parsedFilters.data : defaultFileFilters,
  );
  return (
    <>
      {userFiles && userFiles.length > 0 ? (
        <section className="relative my-4 grid grid-rows-2 gap-3 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Badge
            className="absolute -top-10 right-0 sm:hidden"
            variant={"outline"}
          >
            {userFiles.length} files
          </Badge>
          {userFiles.map((userFile) => {
            return <FileCard key={userFile.id} cardData={userFile} />;
          })}
        </section>
      ) : (
        <section className="flex w-full flex-col items-center justify-center gap-0 text-center sm:gap-2">
          <Stars className="max-h-52 max-w-52 sm:max-h-74 sm:max-w-74" />
          {t("empty")}
        </section>
      )}
    </>
  );
};

export default page;
