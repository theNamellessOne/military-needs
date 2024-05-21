"use client";

import { Pencil } from "lucide-react";
import Link from "next/link";
import { useAuth } from "~/app/auth/_providers/auth-provider";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const NeedItem = (need: any) => {
  const { currentUser } = useAuth();

  return (
    <Link href={`/needs/${need.id}`}>
      <Card key={need.id} className={"relative"}>
        <CardHeader className={"flex-row gap-4"}>
          <Link
            href={`/user-profile/${need.user.id}`}
            className={"flex flex-col items-center gap-2"}
          >
            <Avatar className={"h-20 w-20"}>
              <AvatarFallback>
                {need.user.name.split(" ").map((i: string) => i[0])}
              </AvatarFallback>
            </Avatar>
          </Link>

          <div className={"flex flex-col gap-4"}>
            <CardTitle>{need.name}</CardTitle>
            <CardDescription>{need.description}</CardDescription>
          </div>
        </CardHeader>

        {currentUser?.id === need.user.id && (
          <Link href={`/needs/edit/${need.id}`}>
            <Button size={"icon"} className={"absolute right-1 top-1 h-6 w-6"}>
              <Pencil className={"h-4 w-4"} />
            </Button>
          </Link>
        )}
      </Card>
    </Link>
  );
};
