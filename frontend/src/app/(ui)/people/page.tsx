import { getApis } from "@/apiServices";
import { getTranslation } from "@/i18n";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";
import { PeopleResponse } from "@/apiClient";
import Link from "next/link";
import { DeleteButton } from "./deleteButton";
import { getCacheOptions } from "@/features/cacheOption";

export default async function Page() {
  // const  t  = await getTranslation("app.(ui).group-1.page");
  const { peopleApi } = await getApis();
  const res = await peopleApi.getAllPeopleV1PeopleGet({
    fetchOptions: {
      next: {
        ...(await getCacheOptions("people")),
        cache: "force-cache",
      },
    },
  });
  const peopleData = res.data;
  return (
    <div className="flex flex-col h-full  w-full">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">People Management</h2>
          <Link href="/people/add">
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> Add People
            </Button>{" "}
          </Link>
        </div>

        <Table className="rounded-xl border">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Calendar Integration</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {peopleData.map((people: PeopleResponse) => (
              <TableRow key={people.id}>
                <TableCell>{people.name}</TableCell>
                <TableCell>{people.role}</TableCell>
                <TableCell>{people.email}</TableCell>
                <TableCell>{people.phone}</TableCell>
                <TableCell>{people.organization}</TableCell>
                {/* <TableCell>{people.calendar_integration_id}</TableCell> */}
                <TableCell className="text-right space-x-2">
                  <Link href={`/people/edit/${people.id}`}>
                    <Button variant="outline" size="icon">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>

                  <DeleteButton id={people.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
export const dynamic = "force-dynamic";
