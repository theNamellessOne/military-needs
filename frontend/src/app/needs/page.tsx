import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiResponse } from "~/api-response";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { API_URL } from "~/const";
import { NeedList } from "./_components/need-list";

export default async function ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
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

  const needsRes = await fetch(
    `${API_URL}/needs?page_number=${searchParams?.page ?? 1}&query=${searchParams?.query ?? ""}`,
    {
      method: "GET",
      headers: { Authorization: authToken.value },
    },
  );
  const needsJson: ApiResponse<any> = await needsRes.json();
  const { data: needsData, error: needsError } = needsJson;
  console.log(needsData);

  return <NeedList {...needsData} />;
}
