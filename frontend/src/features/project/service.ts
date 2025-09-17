"use server";
import { PeopleCreateRequest, PeopleUpdateRequest, ProjectCreateRequest, ProjectUpdateRequest } from "@/apiClient";
import { getApis } from "@/apiServices";
import { getCacheTag } from "../cacheOption";
import { revalidateTag } from "next/cache";

// export const PeopleCacheTag = "PeopleCache";

export const addProject = async (data: ProjectCreateRequest) => {
  try {
    const { projectApi } = await getApis();
    const res = await projectApi.createProjectV1ProjectPost(data);
    console.log(res.data);
    const peopleCacheTag = await getCacheTag("project");
    revalidateTag(peopleCacheTag);
    return res.data;
  } catch (error) {
    console.error("Error adding person:", error);
    throw error;
  }
};

export const deleteProject = async (id: number) => {
  try {
    const { projectApi } = await getApis();
    const res = await projectApi.deleteProjectV1ProjectIdDelete(id);
    console.log(res.data);
    const peopleCacheTag = await getCacheTag("people");
    revalidateTag(peopleCacheTag);
    return res.data;
  } catch (error) {
    console.error("Error deleting person:", error);
    throw error;
  }
};

export const editPeople = async (body: ProjectUpdateRequest, id: number) => {
  try {
    const { projectApi } = await getApis();
    const res = await projectApi.updateProjectV1ProjectIdPut(body, id);
    console.log(res.data);
    const peopleCacheTag = await getCacheTag("people");
    revalidateTag(peopleCacheTag);
    return res.data;
  } catch (error) {
    console.error("Error editing person:", error);
    throw error;
  }
};
