import { getUserFiles } from "@/actions/db";
import FileCard from "@/components/feature/FileCard";
import { getUserServerSession } from "@/utils/server";

const page = async () => {
  const session = await getUserServerSession();

  const userFiles = await getUserFiles(session!.user?.id); //? Asserting here since this logic is already handled in middleware
  return (
    <div className="my-4 grid gap-6 md:grid-cols-2">
      {userFiles.map((userFile) => {
        return <FileCard key={userFile.id} cardData={userFile} />;
      })}
    </div>
  );
};

export default page;
