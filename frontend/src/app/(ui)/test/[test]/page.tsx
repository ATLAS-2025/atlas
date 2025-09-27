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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, Calendar, MapPin, Shield, Radio, Users, Wrench } from "lucide-react";
import { PeopleResponse } from "@/apiClient";
import Link from "next/link";
import { PageTopBar } from "@/shared/components/PageTopBar";

import { TestCard } from "../components/TestCard";
import { CreateTestCard } from "../components/CreateTestCard";
interface Params {
  test: string;
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { test } = await params;
  const { testApi } = await getApis();
  const { data } = await testApi.getTestV1TestIdGet(parseInt(test));
  
  if (!data) {
    return <div>Test not found</div>;
  }

  return (
    <div className="flex flex-col h-full w-full">
      <PageTopBar title={`Test #${data.id}`} isProject />
      
      <div className="flex-1 p-6 space-y-6">
        {/* Test Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Test Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Schedule</label>
                <p className="text-lg">{data.schedule}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Project ID</label>
                <p className="text-lg">{data.projectId}</p>
              </div>
            </div>
            
            {data.summary && (
              <div>
                <label className="text-sm font-medium text-gray-500">Summary</label>
                <p className="text-lg">{data.summary}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Safety & Operations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4" />
                Safety
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{data.safety}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                Maps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{data.maps}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Radio className="h-4 w-4" />
                Simulation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{data.simulation}</p>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        {data.categories && data.categories.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Categories</h2>
            {data.categories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="secondary">{category.name}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* People */}
                    {category.people && category.people.length > 0 && (
                      <div>
                        <h3 className="flex items-center gap-2 font-semibold mb-3">
                          <Users className="h-4 w-4" />
                          People ({category.people.length})
                        </h3>
                        <div className="space-y-3">
                          {category.people.map((personRef) => (
                            personRef.person && (
                              <div key={personRef.peopleId} className="border rounded-lg p-3">
                                <div className="font-medium">{personRef.person.name}</div>
                                <div className="text-sm text-gray-600">{personRef.person.role}</div>
                                <div className="text-sm text-gray-500">{personRef.person.organization}</div>
                                <div className="text-sm text-gray-500">{personRef.person.email}</div>
                                <div className="text-sm text-gray-500">{personRef.person.phone}</div>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Equipment */}
                    {category.equipment && category.equipment.length > 0 && (
                      <div>
                        <h3 className="flex items-center gap-2 font-semibold mb-3">
                          <Wrench className="h-4 w-4" />
                          Equipment ({category.equipment.length})
                        </h3>
                        <div className="space-y-3">
                          {category.equipment.map((equipmentRef) => (
                            equipmentRef.equipment && (
                              <div key={equipmentRef.equipmentId} className="border rounded-lg p-3">
                                <div className="font-medium">{equipmentRef.equipment.name}</div>
                                <div className="text-sm text-gray-600">{equipmentRef.equipment.type}</div>
                                <div className="text-sm text-gray-500">
                                  {equipmentRef.equipment.manufacturer} {equipmentRef.equipment.model}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Serial: {equipmentRef.equipment.serialNumber}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Location: {equipmentRef.equipment.location}
                                </div>
                                {equipmentRef.equipment.notes && (
                                  <div className="text-sm text-gray-500">
                                    Notes: {equipmentRef.equipment.notes}
                                  </div>
                                )}
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export const dynamic = "force-dynamic";

