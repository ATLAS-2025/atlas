
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
import AddEquipment from "./AddForm";

export default async function Page() {
  // const  t  = await getTranslation("app.(ui).group-1.page");

  return (
    <div className="flex flex-col h-full  w-full">
       <AddEquipment />
    </div>
  );
}
