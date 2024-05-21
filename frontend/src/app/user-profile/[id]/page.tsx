import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiResponse } from "~/api-response";
import { API_URL } from "~/const";
import { UserInfo } from "./_components/user-info";

export default async function ({ params }: { params: { id: string } }) {
  const authToken = cookies().get("Authorization");
  if (!authToken) return redirect("/");

  const authUser = cookies().get("AuthUser");
  if (!authUser) return redirect("/");

  const userRes = await fetch(`${API_URL}/users/${params.id}`, {
    method: "GET",
    headers: { Authorization: authToken.value },
  });
  const { data: userData, error: userError }: ApiResponse<any> =
    await userRes.json();
  if (userError) return redirect("/");

  const needsRes = await fetch(`${API_URL}/needs/by/${params.id}`, {
    method: "GET",
    headers: { Authorization: authToken.value },
  });
  const { data: needsData, error: needsError }: ApiResponse<any> =
    await needsRes.json();
  if (needsError) return redirect("/");

  console.log(needsData);

  return <UserInfo userData={userData} needsData={needsData} />;
}
