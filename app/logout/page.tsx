"use client";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out buddy!");
          router.push("/login");
        },
      },
    });
  }, []);
  return <div></div>;
};

export default Logout;
