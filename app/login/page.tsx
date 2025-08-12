"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import SignInForm from "@/components/auth/SignInForm";
import BackgroundGradient from "@/components/ui/BackgroundGradient";
import SignUpForm from "@/components/auth/SignUpForm";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import useUser from "@/hooks/useUser";
import { useEffect } from "react";
import useSignInWithGmail from "@/hooks/api/useSignInWithGoogle";

const AuthenticationPage = () => {
  const t = useTranslations("authPage");
  const session = useUser();
  const router = useRouter();
  const { mutateAsync: signInWithGoogle } = useSignInWithGmail();

  useEffect(() => {
    if (session.data?.session && session.data?.user) {
      router.push("/home");
    }
  }, [session, router]);

  return (
    <div className="relative min-h-screen w-full">
      <BackgroundGradient />
      <div className="relative z-10 md:px-20 lg:px-40">
        <Tabs defaultValue="login" className="text-xl">
          <TabsList className="mb-4 flex w-full justify-center lg:mb-8">
            <TabsTrigger value="login">{t("signInForm.tabTitle")}</TabsTrigger>
            <TabsTrigger value="register">
              {t("signUpForm.tabTitle")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <SignInForm />
          </TabsContent>
          <TabsContent value="register">
            <SignUpForm />
          </TabsContent>
          <Button
            variant="outline"
            onClick={() => signInWithGoogle()}
            className="mt-6"
          >
            <p>Sign in with Google</p>
            <GoogleIcon />
          </Button>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthenticationPage;
