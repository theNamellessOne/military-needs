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
import { NeedForm } from "../../_components/need-form";

export default async function ({ params }: { params: { id: string } }) {
  const authToken = cookies().get("Authorization");
  if (!authToken) return redirect("/");

  const authUser = cookies().get("AuthUser");
  if (!authUser) return redirect("/");

  const userRes = await fetch(
    `${API_URL}/users/${JSON.parse(authUser.value).id}`,
    {
      method: "GET",
      headers: { Authorization: authToken.value },
    },
  );
  const userJson: ApiResponse<any> = await userRes.json();
  const { data: userData, error: userError } = userJson;

  if (userError) return redirect("/");
  if (JSON.parse(authUser.value).role !== Role.SOLDIER) return redirect("/");

  const needRes = await fetch(`${API_URL}/needs/${params.id}`, {
    method: "GET",
    headers: { Authorization: authToken.value },
  });
  const needJson: ApiResponse<any> = await needRes.json();
  const { data: needData, error: needError } = needJson;

  if (needError) return redirect("/");
  if (userData.id !== needData.user.id) return redirect("/");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Редагувати потребу</CardTitle>
        <CardDescription>
          Створіть потребу, щоб волонтери могли знайти її в списку
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <NeedForm id={Number(params.id)} data={needData} />
      </CardContent>
    </Card>
  );
}
