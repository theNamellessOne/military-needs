import { cookies } from "next/headers";
import { AuthTabs } from "./_components/auth-tabs";
import { redirect } from "next/navigation";

export default async () => {
  const authToken = cookies().get("Authorization");
  if (authToken) return redirect("/");

  return <AuthTabs />;
};
