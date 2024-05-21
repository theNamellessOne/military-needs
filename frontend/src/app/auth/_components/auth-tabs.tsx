"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function AuthTabs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const key = useMemo(
    () => searchParams.get("key") ?? "login",
    [searchParams.get("key")],
  );

  return (
    <Tabs
      value={key}
      onValueChange={(value) => router.replace(`${pathname}?key=${value}`)}
      className="mx-auto mt-10 w-full max-w-[450px]"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Увійти</TabsTrigger>
        <TabsTrigger value="register">Зареєструватись</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Увійти</CardTitle>
            <CardDescription>Увійдіть в уже існуючий кабінет</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <LoginForm />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Зареєструватись</CardTitle>
            <CardDescription>Створіть новий кабінет</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <RegisterForm />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
