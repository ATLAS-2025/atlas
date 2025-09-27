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
import { PageTopBar } from "@/shared/components/PageTopBar";

import { TestCard } from "../../components/TestCard";
import { CreateTestCard } from "../../components/CreateTestCard";
interface Params {
  name: string;
  test: string;
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { name,test } = await params;
  console.log(params)
  const { testApi } = await getApis();
  const { data } = await testApi.getTestV1TestIdGet(parseInt(test));
  console.log(data)
  return (
    <div className="flex flex-col h-full  w-full">
      {/* <PageTopBar title={data.title} isProject/> */}

      {/* <pre>{JSON.stringify(data)}</pre> */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-5 gap-6 max-w-full mx-auto">
         <pre>{JSON.stringify(data)}</pre>
         
          {/* Empty slot to match design */}
          <div className="w-full h-48"></div>
        </div>
      </div>
    </div>
  );
}
export const dynamic = "force-dynamic";

