import { cookies } from "next/headers";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import Link from "next/link";
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

  const needRes = await fetch(`${API_URL}/needs/${params.id}`, {
    method: "GET",
    headers: { Authorization: authToken.value },
  });
  const needJson: ApiResponse<any> = await needRes.json();
  const { data: needData, error: needError } = needJson;

  if (needError) return redirect("/");

  return (
    <Card>
      <CardHeader className={"flex-row gap-4"}>
        <Link
          href={`/user-profile/${needData.user.id}`}
          className={"flex flex-col items-center gap-2"}
        >
          <Avatar className={"h-20 w-20"}>
            <AvatarFallback>
              {needData.user.name.split(" ").map((i: string) => i[0])}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className={"flex flex-col gap-4"}>
          <CardTitle>{needData.name}</CardTitle>
          <CardDescription>{needData.description}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
