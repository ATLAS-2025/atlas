"use server";
import { PeopleCreateRequest, PeopleUpdateRequest } from "@/apiClient";
import { getApis } from "@/apiServices";
import { getCacheTag } from "../cacheOption";
import { revalidateTag } from "next/cache";

// export const PeopleCacheTag = "PeopleCache";

export const addPeople = async (data: PeopleCreateRequest) => {
  try {
    const { peopleApi } = await getApis();
    const res = await peopleApi.createPersonV1PeoplePost(data);
    console.log(res.data);
    const peopleCacheTag = await getCacheTag("people");
    revalidateTag(peopleCacheTag);
    return res.data;
  } catch (error) {
    console.error("Error adding person:", error);
    throw error;
  }
};

export const deletePeople = async (id: number) => {
  try {
    const { peopleApi } = await getApis();
    const res = await peopleApi.deletePersonV1PeopleIdDelete(id);
    console.log(res.data);
    const peopleCacheTag = await getCacheTag("people");
    revalidateTag(peopleCacheTag);
    return res.data;
  } catch (error) {
    console.error("Error deleting person:", error);
    throw error;
  }
};

export const editPeople = async (body: PeopleUpdateRequest, id: number) => {
  try {
    const { peopleApi } = await getApis();
    const res = await peopleApi.updatePersonV1PeopleIdPut(body, id);
    console.log(res.data);
    const peopleCacheTag = await getCacheTag("people");
    revalidateTag(peopleCacheTag);
    return res.data;
  } catch (error) {
    console.error("Error editing person:", error);
    throw error;
  }
};
