"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { NeedItem } from "./need-item";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

export const NeedList = (props: {
  items: any[];
  current_page: number;
  total_pages: number;
}) => {
  const [value, setValue] = useState("");
  return (
    <div>
      <div className={"flex items-center gap-2"}>
        <Input
          placeholder={"Пошук"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Link href={`/needs?query=${value}`}>
          <Button size={"icon"} variant={"outline"}>
            <Search className={"h-4 w-4"} />
          </Button>
        </Link>
      </div>
      <div className={"mt-2"}></div>

      {props.items.map((item: any) => (
        <NeedItem {...item} key={item.id} />
      ))}

      <Pagination>
        <PaginationContent>
          {props.current_page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`/needs/${props.current_page - 1}`} />
            </PaginationItem>
          )}

          {props.current_page < props.total_pages && (
            <PaginationItem>
              <PaginationNext href={`/needs/${props.current_page + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
