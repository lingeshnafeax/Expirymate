"use client";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { signInWithEmailSchema } from "@/validations/validation";
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
import { useTranslations } from "next-intl";
const SignInForm = () => {
  const form = useForm<z.infer<typeof signInWithEmailSchema>>({
    resolver: zodResolver(signInWithEmailSchema),
  });
  const t = useTranslations("authPage.signInForm");
  const handleLoginUser = async (
    data: z.infer<typeof signInWithEmailSchema>,
  ) => {};
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleLoginUser)}
          >
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{t("submitButton.text")}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
