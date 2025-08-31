import FileMoreButton from "@/components/feature/Home/File/FileMoreButton";
import { Timer } from "lucide-react";
import { ReactNode } from "react";

export default async function Layout({
  children,
  file,
}: {
  children: ReactNode;
  file: ReactNode;
}) {
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-Gabarito text-xl">Hurry! Ending Soon</h3>
          <FileMoreButton />
        </div>
        {file}
      </div>
      {children}
    </>
  );
}
