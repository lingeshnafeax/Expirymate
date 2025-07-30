"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth/auth-client";

const page = () => {
  return (
    <div className="w-full">
      <Button onClick={signInWithGoogle}>Sign in with google</Button>
    </div>
  );
};

export default page;
