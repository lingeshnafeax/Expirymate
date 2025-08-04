import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth/auth-config";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import SignInForm from "@/components/auth/SignInForm";
import BackgroundGradient from "@/components/ui/BackgroundGradient";
import SignUpForm from "@/components/auth/SignUpForm";
import { getTranslations } from "next-intl/server";
import GoogleIcon from "@/components/ui/icons/GoogleIcon";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth/auth-client";


//TODO: Change this to client component
const AuthenticationPage = async () => {
  const t = await getTranslations("authPage");
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/home");
  }

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
          <Button variant="outline" onClick={signInWithGoogle} className="mt-6">
            <p>Sign in with Google</p>
            <GoogleIcon />
          </Button>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthenticationPage;
