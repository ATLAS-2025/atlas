import { getApis } from "@/apiServices";
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
import Link from "next/link";
import { DeleteButton } from "./deleteButton";
import { getCacheOptions } from "@/features/cacheOption";

import type { CampaignResponse } from "@/apiClient"; // Adjust import path if needed

export default async function Page() {
  const { campaignManagementApi } = await getApis();

  const res = await campaignManagementApi.getAllCampaignsV1CampaignsGet({ // Adjust method name as per your API client
    fetchOptions: {
      next: {
        ...(await getCacheOptions("campaigns")),
        cache: "force-cache",
      },
    },
  });

  const campaignData: CampaignResponse[] = res.data;
  console.log(campaignData)
  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Campaign Management</h2>
          <Link href="/campaigns/add">
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> Add Campaign
            </Button>
          </Link>
        </div>

        <Table className="rounded-xl border">
          <TableHeader>
            <TableRow>
              <TableHead>Campaign Name</TableHead>
              {/* <TableHead>Folder Path</TableHead> */}
              <TableHead>Start Date</TableHead>
              <TableHead>Duration (Days)</TableHead>
              <TableHead>JSON File Path</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaignData.map((campaign: CampaignResponse) => (
              <TableRow key={campaign.campaignName}>
                <TableCell>{campaign.campaign_name}</TableCell>
                {/* <TableCell>{campaign.folder_path}</TableCell> */}
                <TableCell>{campaign.start_date}</TableCell>
                <TableCell>{campaign.duration_days}</TableCell>
                <TableCell>{campaign.folder_path ?? "N/A"}</TableCell>
                <TableCell className="text-right space-x-2">
                  {/* <Link href={`/campaigns/edit/${encodeURIComponent(campaign.campaignName)}`}>
                    <Button variant="outline" size="icon">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link> */}

                  {/* <DeleteButton id={campaign.campaignName} /> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
