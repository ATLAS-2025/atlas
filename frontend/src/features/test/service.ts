"use server";
import { PeopleCreateRequest, PeopleUpdateRequest, ProjectCreateRequest, ProjectUpdateRequest, TestCreateRequest, TestUpdateRequest } from "@/apiClient";
import { getApis } from "@/apiServices";
import { getCacheTag } from "../cacheOption";
import { revalidateTag } from "next/cache";


// export const PeopleCacheTag = "PeopleCache";

export const addTest = async (data: TestCreateRequest) => {
  try {
    const { testApi } = await getApis();
    const res = await testApi.createTestV1TestPost(data);
    console.log(res.data);
    const peopleCacheTag = await getCacheTag("test");
    revalidateTag(peopleCacheTag);
    return res.data;
  } catch (error) {
    console.error("Error adding person:", error);
    throw error;
  }
};

export const deleteTest = async (id: number) => {
  try {
    const { testApi } = await getApis();
    const res = await testApi.deleteTestV1TestIdDelete(id);
    console.log(res.data);
    const peopleCacheTag = await getCacheTag("people");
    revalidateTag(peopleCacheTag);
    return res.data;
  } catch (error) {
    console.error("Error deleting person:", error);
    throw error;
  }
};

export const editTest = async (body: TestUpdateRequest, id: number) => {
  try {
    const { testApi } = await getApis();
    const res = await testApi.updateTestV1TestIdPut(body, id);
    console.log(res.data);
    const peopleCacheTag = await getCacheTag("people");
    revalidateTag(peopleCacheTag);
    return res.data;
  } catch (error) {
    console.error("Error editing person:", error);
    throw error;
  }
};
