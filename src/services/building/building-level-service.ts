import { ApiResponse } from "../../interfaces";
import { IBuildingLevel } from "../../interfaces/client";
import { createApiClient } from "../api-client";

interface IBuildingLevelService {

    getAllBuildingLevelClient(city: string): Promise<ApiResponse<IBuildingLevel[]>>;
    getAllBuildingLevels(): Promise<ApiResponse<IBuildingLevel[]>>;
}

const apiClient = createApiClient("building-levels");

class BuildingLevelService implements IBuildingLevelService {

    async getAllBuildingLevelClient(city: string): Promise<ApiResponse<IBuildingLevel[]>> {
        return (await apiClient.get(`/company?city=${city}`)).data;
    }

    async getAllBuildingLevels(): Promise<ApiResponse<IBuildingLevel[]>> {
        return (await apiClient.get("/all")).data;
    }
}

export const buildingLevelService = new BuildingLevelService();
