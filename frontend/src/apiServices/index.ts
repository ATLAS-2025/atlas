import {
  CampaignManagementApi,
  CampaignManagementApiFp,
  Configuration,
  EquipmentApi,
  EquipmentApiFp,
  PeopleApi,
  PeopleApiFp,
  SensorApi,
  SensorApiFp,
  UsersApi,
  UsersApiFactory,
  UsersApiFp,
} from "@/apiClient";
import { env } from "./data/env/server";
const config = new Configuration({
  basePath: env.API_URL,
});

export const usersApi = UsersApiFactory(config);
export const peopleApi = PeopleApiFp(config);
export const sensorApi = SensorApiFp(config);
export const equipmentApi = EquipmentApiFp(config);
export const campaignManagementApi = CampaignManagementApiFp(config);
