import { authClient, signOut } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

const useUser = () => {
  const router = useRouter();
  const data = authClient.useSession();

  const logOutUser = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (err) {
      console.log("Error logging out user", err);
    }
  };

  return { logOutUser, ...data };
};

export default useUser;
