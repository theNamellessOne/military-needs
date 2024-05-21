"use client";

import Link from "next/link";
import { LogOut, PlusCircle, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useAuth } from "~/app/auth/_providers/auth-provider";
import { Role } from "~/schema/user-schema";

export const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header
      className={
        "container mx-auto flex items-center justify-between gap-2 p-4 "
      }
    >
      <h2 className={"text-2xl"}>
        <Link href={"/"}>/logo/</Link>
      </h2>

      <Link href={"/needs"}>
        <Button variant={"link"}>Потреби</Button>
      </Link>

      {isAuthenticated ? <HeaderAvatar /> : <HeaderButtons />}
    </header>
  );
};

const HeaderButtons = () => {
  return (
    <div className={"flex items-center gap-1"}>
      <Link href={"/auth?key=login"}>
        <Button variant={"default"}>Увійти</Button>
      </Link>
      <Link href={"/auth?key=register"}>
        <Button variant={"secondary"}>Зареєструватись</Button>
      </Link>
    </div>
  );
};

const HeaderAvatar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <Avatar>
            <AvatarFallback>
              {currentUser?.name.split(" ").map((i) => i[0])}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <Link href={`/user-profile/${currentUser?.id}`}>
            <DropdownMenuItem className={"cursor-pointer"}>
              <User className="mr-2 h-4 w-4" />
              <span>Профіль</span>
            </DropdownMenuItem>
          </Link>

          <Link href={"/settings"}>
            <DropdownMenuItem className={"cursor-pointer"}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Налаштування</span>
            </DropdownMenuItem>
          </Link>

          {currentUser?.role === Role.SOLDIER && (
            <Link href={"/needs/create"}>
              <DropdownMenuItem className={"cursor-pointer"}>
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Додати</span>
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className={"cursor-pointer"} onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Вийти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
