
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
import { PeopleResponse, SensorResponse } from "@/apiClient";
import Link from "next/link";
import { DeleteButton } from "./deleteButton";
import { getCacheOptions } from "@/features/cacheOption";


export default async function Page() {
  const { sensorApi } = await getApis();
  const { data: sensorData } = await sensorApi.getAllSensorsV1SensorGet({
    fetchOptions: {
      next: {
        ...(await getCacheOptions("sensor")),
        cache: "force-cache",
      },
    },
  });
  
  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Sensor Management</h2>
          <Link href="/sensor/add">
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> Add Sensor
            </Button>
          </Link>
        </div>

        <Table className="rounded-xl border">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Serial Number</TableHead>
              <TableHead>Calibration Date</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sensorData.map((sensor: SensorResponse) => (
              <TableRow key={sensor.id}>
                <TableCell>{sensor.name}</TableCell>
                <TableCell>{sensor.type}</TableCell>
                <TableCell>{sensor.model}</TableCell>
                <TableCell>{sensor.serialNumber}</TableCell>
                <TableCell>
                 {sensor.calibrationDate ? sensor.calibrationDate.toLocaleDateString() : "-"}
                </TableCell>
                <TableCell>{sensor.notes ?? "-"}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Link href={`/sensor/edit/${sensor.id}`}>
                    <Button variant="outline" size="icon">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>
                  <DeleteButton id={sensor.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}