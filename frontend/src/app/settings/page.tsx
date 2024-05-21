import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiResponse } from "~/api-response";
import { API_URL } from "~/const";
import { SettingsForm } from "./_components/settings-form";

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

  return <SettingsForm userId={data.id} defaultValues={data} />;
};
