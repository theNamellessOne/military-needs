import { NeedForm } from "../_components/need-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiResponse } from "~/api-response";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { API_URL } from "~/const";
import { Role } from "~/schema/user-schema";

export default async () => {
  const authToken = cookies().get("Authorization");
  if (!authToken) return redirect("/");

  const authUser = cookies().get("AuthUser");
  if (!authUser) return redirect("/");

  const res = await fetch(`${API_URL}/users/${JSON.parse(authUser.value).id}`, {
    method: "GET",
    headers: { Authorization: authToken.value },
  });
  const json: ApiResponse<any> = await res.json();
  const { data, error } = json;

  if (error) return redirect("/");
  if (JSON.parse(authUser.value).role !== Role.SOLDIER) return redirect("/");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Створити потребу</CardTitle>
        <CardDescription>
          Створіть потребу, щоб волонтери могли знайти її в списку
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <NeedForm />
      </CardContent>
    </Card>
  );
};
