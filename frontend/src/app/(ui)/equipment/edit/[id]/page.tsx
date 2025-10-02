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
import EditPeople from "./EditEquipment";
interface Params {
  id: string;
}

export function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ];
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const { equipmentApi } = await getApis();
  const { data } = await equipmentApi.getEquipmentV1EquipmentIdGet(
    parseInt(id)
  );
  return (
    <div className="flex flex-col h-full  w-full">
      <EditPeople defaultValues={data} />
    </div>
  );
}
