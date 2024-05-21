"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserLoginInput, userLoginSchema } from "~/schema/user-schema";
import { useState } from "react";
import { FormField } from "~/components/form-field";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../_providers/auth-provider";

export const LoginForm = () => {
  const { login } = useAuth();
  const form = useForm<UserLoginInput>({
    mode: "onChange",
    resolver: zodResolver(userLoginSchema),
  });
  const { isSubmitting, isValid } = form.formState;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: UserLoginInput) => {
    login(data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"flex flex-col gap-3"}
      >
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
          Увійти
        </Button>
      </form>
    </FormProvider>
  );
};
