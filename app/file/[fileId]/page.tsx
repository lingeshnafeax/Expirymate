import { getFileById } from "@/actions/db";
import Link from "next/link";

const page = async ({ params }: { params: Promise<{ fileId: string }> }) => {
  const { fileId } = await params;

  const fileData = await getFileById(fileId);

  if (fileData) {
    return (
      <div>
        <Link href={"/home"}>Back</Link>File Data: {JSON.stringify(fileData)}
      </div>
    );
  }
  return <div>File not found</div>;
};

export default page;
