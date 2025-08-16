import { ReactNode } from "react";

export default function Layout({
  children,
  file,
}: {
  children: ReactNode;
  file: ReactNode;
}) {
  return (
    <>
      <div >
        <h3 className="font-Gabarito text-2xl">My files</h3>
        {file}
      </div>
      {children}
    </>
  );
}
