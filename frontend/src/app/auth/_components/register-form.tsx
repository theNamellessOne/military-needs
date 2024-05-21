"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Role,
  UserRegisterInput,
  userRegisterSchema,
} from "~/schema/user-schema";
import { useState } from "react";
import { FormField } from "~/components/form-field";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Loader2 } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";
import { API_URL } from "~/const";
import { useToast } from "~/components/ui/use-toast";
import { ApiResponse } from "~/api-response";
import { useAuth } from "../_providers/auth-provider";

export const RegisterForm = () => {
  const { toast } = useToast();
  const { login } = useAuth();

  const form = useForm<UserRegisterInput>({
    mode: "onChange",
    resolver: zodResolver(userRegisterSchema),
  });
  const { isSubmitting, isValid } = form.formState;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: UserRegisterInput) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const json: ApiResponse<any> = await res.json();

    toast({
      title: json.error ? "Помилка" : "Успіх",
      description: json.error ?? "Вас зареєстровано в системі",
    });

    if (json.error) return;
    login(data);
  };

  return (
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
          name={"role"}
          label={"Хто ви?"}
          register={(field) => (
            <RadioGroup
              defaultValue={field.value}
              onValueChange={field.onChange}
              className={"grid-flow-col"}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={Role.VOLUNTEER} id="r1" />
                <Label htmlFor="r1">Волонтер</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={Role.SOLDIER} id="r3" />
                <Label htmlFor="r3">Військовий</Label>
              </div>
            </RadioGroup>
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
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Зареєструватись
        </Button>
      </form>
    </FormProvider>
  );
};
