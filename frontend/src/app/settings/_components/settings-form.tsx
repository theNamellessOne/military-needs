"use client";

import { FormProvider, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRegisterInput, userRegisterSchema } from "~/schema/user-schema";
import { useState } from "react";
import { FormField } from "~/components/form-field";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Loader2 } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";
import { API_URL } from "~/const";
import { useToast } from "~/components/ui/use-toast";
import { ApiResponse } from "~/api-response";
import { useAuth } from "~/app/auth/_providers/auth-provider";

export const SettingsForm = (props: {
  userId: number;
  defaultValues: Partial<UserRegisterInput>;
}) => {
  const { toast } = useToast();
  const { login } = useAuth();
  const { token } = useAuth();

  const form = useForm<UserRegisterInput>({
    mode: "onChange",
    resolver: zodResolver(userRegisterSchema),
    defaultValues: props.defaultValues,
  });
  const { isSubmitting, isValid } = form.formState;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: UserRegisterInput) => {
    const res = await fetch(`${API_URL}/users/${props.userId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: token ?? "",
      },
      body: JSON.stringify(data),
    });
    const json: ApiResponse<any> = await res.json();
    //@ts-ignore
    const error = json.error || json.detail;

    toast({
      title: error ? "Помилка" : "Успіх",
      description: error ?? "Дані оновлено",
    });

    if (error) return;
    login(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Налаштування</CardTitle>
        <CardDescription>Тут ви можете редагувати свої дані</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={"flex flex-col gap-3"}
          >
            <FormField
              name={"name"}
              label={"Ім'я"}
              register={(field) => (
                <Input placeholder={"Прокопенко Василь"} {...field} />
              )}
            />

            <FormField
              name={"contact_info"}
              label={"Контактні дані"}
              register={(field) => (
                <Textarea placeholder={"Номер телефону..."} {...field} />
              )}
            />

            <FormField
              name={"email"}
              label={"Електронна пошта"}
              register={(field) => (
                <Input placeholder={"xample@gmail.com"} {...field} />
              )}
            />

            <FormField
              name={"password"}
              label={"Пароль"}
              register={(field) => (
                <Input type={showPassword ? "text" : "password"} {...field} />
              )}
            />

            <Button disabled={!isValid || isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Зберегти
            </Button>
          </form>
        </FormProvider>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
