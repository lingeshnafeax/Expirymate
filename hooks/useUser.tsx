import { authClient } from "@/lib/auth/auth-client";

const useUser = () => {
  const data = authClient.useSession();
  return data;
};

export default useUser;
