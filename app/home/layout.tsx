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
          <div className="flex items-center gap-x-1.5">
            <h3 className="font-Gabarito text-2xl">Expiring Soon</h3>
            <Timer />
          </div>
          <FileMoreButton />
        </div>
        {file}
      </div>
      {children}
    </>
  );
}
