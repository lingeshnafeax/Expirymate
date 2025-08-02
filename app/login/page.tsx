import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth/auth-config";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import SignInForm from "@/components/client/form/auth/SignInForm";
import BackgroundGradient from "@/components/ui/BackgroundGradient";
import SignUpForm from "@/components/client/form/auth/SignUpForm";
import { getTranslations } from "next-intl/server";

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
        </Tabs>
      </div>
    </div>
  );
};

export default AuthenticationPage;
