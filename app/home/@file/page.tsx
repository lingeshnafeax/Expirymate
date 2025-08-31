import { getUserFiles } from "@/actions/db";
import { DEFAULT_NO_OF_FILES_TO_FETCH } from "@/constants";
import { getUserServerSession } from "@/utils/server";
import FileCard from "@/components/feature/Home/File/FileCard";
const page = async () => {
  const session = await getUserServerSession();

  const userFiles = await getUserFiles(
    session!.user?.id,
    DEFAULT_NO_OF_FILES_TO_FETCH,
  ); //? Asserting here since this logic is already handled in middleware
  return (
    <div className="my-4 grid gap-3 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
      {userFiles.map((userFile) => {
        return <FileCard key={userFile.id} cardData={userFile} />;
      })}
    </div>
  );
};

export default page;
