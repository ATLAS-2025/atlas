import {
  CampaignManagementApi,
  CampaignManagementApiFp,
  Configuration,
  EquipmentApi,
  EquipmentApiFp,
  PeopleApi,
  PeopleApiFp,
  ProjectApi,
  SensorApi,
  SensorApiFp,
  TestsApi,
  UsersApi,
  UsersApiFactory,
  UsersApiFp,
} from "@/apiClient";
import { env } from "./data/env/server";
import axios from "axios";
import { auth } from "@/auth";
const config = new Configuration({
  basePath: env.API_URL,
});
const serverAxiosInstance = async () => {
  const isAuth = await auth();
  const instance = isAuth
    ? axios.create({
        baseURL: process.env.API_URL || "http://localhost:8000",
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isAuth.user.access}`,
        },
      })
    : axios.create({
        baseURL: process.env.API_URL || "http://localhost:8000",
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
        },
      });
  return instance;
};

export const getApis = async () => {
  const axiosInstance = await serverAxiosInstance();

  return {
    usersApi: new UsersApi(config, undefined, axiosInstance),
    peopleApi: new PeopleApi(config, undefined, axiosInstance),
    sensorApi: new SensorApi(config, undefined, axiosInstance),
    equipmentApi: new EquipmentApi(config, undefined, axiosInstance),
    campaignManagementApi: new CampaignManagementApi(
      config,
      undefined,
      axiosInstance
    ),
    projectApi: new ProjectApi(config, undefined, axiosInstance),
    testApi: new TestsApi(config, undefined, axiosInstance),
  };
};
