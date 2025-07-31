import { Roles } from "@/types/types";
import React, { ReactNode, useEffect } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/router";
const { useSession } = authClient;
const ProtectedRoute = ({
  children,
  accessAllowedFor,
}: {
  children: ReactNode;
  accessAllowedFor: Roles[];
}) => {
  const { data } = useSession();
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
