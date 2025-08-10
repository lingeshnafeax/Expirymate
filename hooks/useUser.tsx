import { authClient, signOut } from "@/lib/auth/auth-client";
import { logger } from "@sentry/nextjs";
import { useRouter } from "next/navigation";

const useUser = () => {
  const router = useRouter();
  const data = authClient.useSession();

  const logOutUser = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (err) {
      logger.error("Error logging out user", { error: err });
    }
  };

  return { logOutUser, ...data };
};

export default useUser;
