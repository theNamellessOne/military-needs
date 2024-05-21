import Link from "next/link";
import { NeedItem } from "~/app/needs/_components/need-item";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const UserInfo = ({
  userData,
  needsData,
}: {
  userData: any;
  needsData: any;
}) => {
  return (
    <Card>
      <CardHeader className={"flex-row gap-4"}>
        <Avatar className={"h-20 w-20"}>
          <AvatarFallback>
            {userData.name.split(" ").map((i: string) => i[0])}
          </AvatarFallback>
        </Avatar>

        <div className={"flex flex-col gap-4"}>
          <CardTitle>{userData.name}</CardTitle>

          <div className={"flex flex-col gap-1.5"}>
            <Badge className={"w-fit"}>{userData.role}</Badge>
            <CardDescription>{userData.email}</CardDescription>
            <CardDescription>{userData.contact_info}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {needsData.items.map((need: any) => {
          return <NeedItem {...need} />;
        })}
      </CardContent>
    </Card>
  );
};
