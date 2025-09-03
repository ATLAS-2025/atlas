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
import { EquipmentResponse } from "@/apiClient";
import Link from "next/link";
import { DeleteButton } from "./deleteButton";
import { getCacheOptions } from "@/features/cacheOption";

export default async function Page() {
  // const  t  = await getTranslation("app.(ui).group-1.page");
  const { equipmentApi } = await getApis();
  const { data } = await equipmentApi.getAllEquipmentV1EquipmentGet({
    fetchOptions: {
      next: {
        ...(await getCacheOptions("equipment")),
        cache: "force-cache",
      },
    },
  });
  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Equipment Management</h2>
          <Link href="/equipment/add">
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> Add Equipment
            </Button>
          </Link>
        </div>

        <Table className="rounded-xl border">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Serial Number</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((equipment: EquipmentResponse) => (
              <TableRow key={equipment.id}>
                <TableCell>{equipment.name}</TableCell>
                <TableCell>{equipment.type}</TableCell>
                <TableCell>{equipment.manufacturer}</TableCell>
                <TableCell>{equipment.model}</TableCell>
                <TableCell>{equipment.serialNumber}</TableCell>
                <TableCell>{equipment.location}</TableCell>
                <TableCell>{equipment.notes ?? "-"}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Link href={`/equipment/edit/${equipment.id}`}>
                    <Button variant="outline" size="icon">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>
                  <DeleteButton id={equipment.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
