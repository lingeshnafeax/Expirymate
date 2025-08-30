import { getExpiringFilesCount } from "@/actions/db";
import { getUserServerSession } from "@/utils/server";
import { Button } from "../../../ui/button";
import { DEFAULT_NO_OF_FILES_TO_FETCH } from "@/constants";

const FileMoreButton = async () => {
  try {
    const session = await getUserServerSession();
    const upcomingExpiryFilesCount = await getExpiringFilesCount(
      session!.user.id,
    ); //? Asserting here since this logic is already handled in middleware
    return (
      <>
        {upcomingExpiryFilesCount >= 1 && (
          <Button variant="outline" size="lg">
            All
            <span className="bg-primary text-foreground flex h-4 w-4 items-center justify-center rounded-xl text-xs">
              {upcomingExpiryFilesCount}
            </span>
          </Button>
        )}
      </>
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default FileMoreButton;
