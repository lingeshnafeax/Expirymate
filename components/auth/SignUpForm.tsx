"use client";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { signUpWithEmailSchema } from "@/validations/validation";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "@/components/ui/password-input";
import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import useSignUpWithEmail from "@/hooks/api/useSignUpWithEmail";
const SignUpForm = () => {
  const form = useForm<z.infer<typeof signUpWithEmailSchema>>({
    resolver: zodResolver(signUpWithEmailSchema),
  });
  const { mutateAsync: signUpWithEmailAndPassword, isPending } =
    useSignUpWithEmail();
  const t = useTranslations("authPage.signUpForm");

  const handleRegisterUser = async (
    data: z.infer<typeof signUpWithEmailSchema>,
  ) => {
    await signUpWithEmailAndPassword(data);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleRegisterUser)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-1">
                  <FormLabel>{t("fields.name.label")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-1">
                  <FormLabel>{t("fields.email.label")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-1">
                  <FormLabel>{t("fields.password.label")}</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="grid gap-1">
                  <FormLabel>{t("fields.confirmPassword.label")}</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader /> : t("submitButton.text")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
