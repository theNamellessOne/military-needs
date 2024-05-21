"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { ApiResponse } from "~/api-response";
import { useAuth } from "~/app/auth/_providers/auth-provider";
import { FormField } from "~/components/form-field";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/components/ui/use-toast";
import { API_URL } from "~/const";
import { NeedCreateInput, needCreateSchema } from "~/schema/need-schema";

export const NeedForm = (props: { id?: number; data?: NeedCreateInput }) => {
  const { toast } = useToast();
  const form = useForm<NeedCreateInput>({
    mode: "onChange",
    resolver: zodResolver(needCreateSchema),
    defaultValues: props.data,
  });
  const { isSubmitting, isValid } = form.formState;
  const { token } = useAuth();

  const onSubmit = async (data: NeedCreateInput) => {
    const res = await fetch(`${API_URL}/needs/${props.id ?? ""}`, {
      method: props.id ? "PUT" : "POST",
      headers: {
        Authorization: token ?? "",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json: ApiResponse<any> = await res.json();

    toast({
      title: json.error ? "Помилка" : "Успіх",
      description: json.error ?? "Збережено",
    });
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"flex flex-col gap-3"}
      >
        <FormField
          name={"name"}
          label={"Заголовок"}
          register={(field) => <Input placeholder={"Дрон"} {...field} />}
        />

        <FormField
          name={"description"}
          label={"Опис"}
          register={(field) => <Textarea placeholder={"Дрон"} {...field} />}
        />

        <Button disabled={!isValid || isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Зберегти
        </Button>
      </form>
    </FormProvider>
  );
};
