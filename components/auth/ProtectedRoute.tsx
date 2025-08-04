import { Roles } from "@/types/types";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";
const ProtectedRoute = ({
  children,
  accessAllowedFor,
}: {
  children: ReactNode;
  accessAllowedFor: Roles[];
}) => {
  const { data } = useUser();
  const router = useRouter();

  const checkAccess = () => {
    if (!data?.user) {
      // TODO: Redirect to login page
    } else if (data?.user.role) {
      const user = data.user.role as Roles;
      if (!accessAllowedFor.includes(user)) {
        router.push("/forbidden");
      }
    }
  };

  useEffect(() => {
    checkAccess();
  }, []);
  return children;
};

export default ProtectedRoute;
