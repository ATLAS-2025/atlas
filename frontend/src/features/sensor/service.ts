"use server";
import { SensorCreateRequest, SensorUpdateRequest } from "@/apiClient";
import { getApis } from "@/apiServices";
import { getCacheTag } from "../cacheOption";
import { revalidateTag } from "next/cache";

// export const SensorCacheTag = "SensorCache";

export const addSensor = async (data: SensorCreateRequest) => {
  try {
    const { sensorApi } = await getApis();
    const res = await sensorApi.createSensorV1SensorPost(data);
    console.log(res.data);
    const sensorCacheTag = await getCacheTag("sensor");
    revalidateTag(sensorCacheTag);
    return res.data;
  } catch (error) {
    console.error("Error adding person:", error);
    throw error;
  }
};

export const deleteSensor = async (id: number) => {
  try {
    const { sensorApi } = await getApis();
    const res = await sensorApi.deleteSensorV1SensorIdDelete(id);
    console.log(res.data);
    const sensorCacheTag = await getCacheTag("sensor");
    revalidateTag(sensorCacheTag);
    return res.data;
  } catch (error) {
    console.error("Error deleting person:", error);
    throw error;
  }
};

export const editSensor = async (body: SensorUpdateRequest, id: number) => {
  try {
    const { sensorApi } = await getApis();
    const res = await sensorApi.updateSensorV1SensorIdPut(body, id);
    console.log(res.data);
    const sensorCacheTag = await getCacheTag("sensor");
    revalidateTag(sensorCacheTag);
    return res.data;
  } catch (error) {
    console.error("Error editing person:", error);
    throw error;
  }
};