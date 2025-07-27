"use server";
import { EquipmentCreateRequest, EquipmentUpdateRequest,} from "@/apiClient";
import { getApis } from "@/apiServices";
import { getCacheTag } from "../cacheOption";
import { revalidateTag } from "next/cache";

// export const equipmentCacheTag = "equipmentCache";

export const addEquipment = async (data: EquipmentCreateRequest) => {
  try {
    const { equipmentApi } = await getApis();
    const res = await equipmentApi.createEquipmentV1EquipmentPost(data);
    console.log(res.data);
    const equipmentCacheTag = await getCacheTag("equipment");
    revalidateTag(equipmentCacheTag);
    return res.data;
  } catch (error) {
    console.error("Error adding person:", error);
    throw error;
  }
};

export const deletEquipment = async (id: number) => {
  try {
    const { equipmentApi } = await getApis();
    const res = await equipmentApi.deleteEquipmentV1EquipmentIdDelete(id);
    console.log(res.data);
    const equipmentCacheTag = await getCacheTag("equipment");
    revalidateTag(equipmentCacheTag);
    return res.data;
  } catch (error) {
    console.error("Error deleting person:", error);
    throw error;
  }
};

export const editEquipment = async (body: EquipmentUpdateRequest, id: number) => {
  try {
    const { equipmentApi } = await getApis();
    const res = await equipmentApi.updateEquipmentV1EquipmentIdPut(body, id);
    console.log(res.data);
    const equipmentCacheTag = await getCacheTag("equipment");
    revalidateTag(equipmentCacheTag);
    return res.data;
  } catch (error) {
    console.error("Error editing person:", error);
    throw error;
  }
};