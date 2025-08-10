"use server";
import { CreateCampaignRequest, LoadCampaignRequest, PeopleCreateRequest, PeopleUpdateRequest } from "@/apiClient";
import { getApis } from "@/apiServices";
import { getCacheTag } from "../cacheOption";
import { revalidateTag } from "next/cache";

// export const PeopleCacheTag = "PeopleCache";

export const createCampaign = async (data: CreateCampaignRequest) => {
  try {
    const { campaignManagementApi } = await getApis();
    const res = await campaignManagementApi.createCampaignV1CampaignsCreatePost(data);
    console.log(res.data);
    const peopleCacheTag = await getCacheTag("people");
    revalidateTag(peopleCacheTag);
    return res.data;
  } catch (error) {
    console.error("Error adding person:", error);
    throw error;
  }
};

// export const deleteCampaign = async (id: number) => {
//   try {
//     const { campa } = await getApis();
//     const res = await campaignManagementApi.de(id);
//     console.log(res.data);
//     const peopleCacheTag = await getCacheTag("people");
//     revalidateTag(peopleCacheTag);
//     return res.data;
//   } catch (error) {
//     console.error("Error deleting person:", error);
//     throw error;
//   }
// };

export const loadCampaign = async (body: LoadCampaignRequest) => {
  try {
    const { campaignManagementApi } = await getApis();
    const res = await campaignManagementApi.loadCampaignV1CampaignsLoadPost(body);
    console.log(res.data);
    const peopleCacheTag = await getCacheTag("people");
    revalidateTag(peopleCacheTag);
    return res.data;
  } catch (error) {
    console.error("Error editing person:", error);
    throw error;
  }
};