"use server";
import { getExpiringFilesCount } from "@/actions/db";
import { getUserServerSession } from "@/utils/server";
import { Button } from "@/components/ui/button";

const FileMoreButton = async () => {
  try {
    const session = await getUserServerSession();
    const upcomingExpiryFilesCount = await getExpiringFilesCount(
      session!.user.id,
    ); //? Asserting here since this logic is already handled in middleware
    return (
      <>
        {upcomingExpiryFilesCount > 0 && (
          <Button
            variant="outline"
            size="lg"
            className="rounded-3xl px-3 sm:hidden sm:px-4"
          >
            All
            <span className="bg-primary text-primary-foreground flex h-4.5 w-4.5 items-center justify-center rounded-xl p-1 text-xs">
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
