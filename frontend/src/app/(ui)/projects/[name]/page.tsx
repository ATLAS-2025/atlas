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
import { ProjectCard } from "../../recent/components/ProjectCard";
import { AllProjectsCard } from "../components/AllProjectsCard";
import { TestCard } from "../components/TestCard";
import { CreateTestCard } from "../components/CreateTestCard";
interface Params {
  name: string;
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { name } = await params;
  const { projectApi,equipmentApi,testApi,peopleApi } = await getApis();
  const { data } = await projectApi.getProjectV1ProjectIdGet(parseInt(name));
  const { data:equiqments } = await equipmentApi.getAllEquipmentV1EquipmentGet();
  const { data:categories } = await testApi.getAllCategoriesV1TestCategoriesGet();
  const { data:peoples } = await peopleApi.getAllPeopleV1PeopleGet();
  console.log(data,equiqments,
categories,
peoples)
  return (
    <div className="flex flex-col h-full  w-full">
      <PageTopBar title={data.title} isProject     equiqments={equiqments}
          categories={categories}
          peoples={peoples}
          project={data}
          />

      {/* <pre>{JSON.stringify(data)}</pre> */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-5 gap-6 max-w-full mx-auto">
          {data?.tests&& data?.tests?.length >0?
           data?.tests.map(test => (
            <TestCard key={test.id} test={test} />
          ))
          :<CreateTestCard project={data} 

          />
          
          }
         
          {/* Empty slot to match design */}
          <div className="w-full h-48"></div>
        </div>
      </div>
      
    </div>
  );
}
export const dynamic = "force-dynamic";

