import { ApiResponse, BuildingCompanyFilterCriteria, IBuilding, Page, PaginationParams } from "../../interfaces";
import { createApiClient } from "../api-client";

export interface IBuildingService {

    getBuildingById(buildingId: number): Promise<ApiResponse<IBuilding>>;
    getBuildingCompanys(pagination: PaginationParams, filter?: BuildingCompanyFilterCriteria): Promise<ApiResponse<Page<IBuilding>>>;
    getAllStreet(ward: string, district: string): Promise<ApiResponse<string[]>>;
}
const apiClient = createApiClient("building-clients");

class BuildingService implements IBuildingService {
    async getBuildingById(buildingId: number): Promise<ApiResponse<IBuilding>> {
        return (await apiClient.get(`/${buildingId}`)).data;
    }


    async getBuildingCompanys(
        pagination: PaginationParams, filter?: BuildingCompanyFilterCriteria
    ): Promise<ApiResponse<Page<IBuilding>>> {
        return (
            await apiClient.get("", {
                params: {
                    ...pagination,
                    ...filter,
                },
            })
        ).data;
    }

    async getAllStreet(ward: string, district: string): Promise<ApiResponse<string[]>> {
        return (await apiClient.get(`/streets?district=${district}&ward=${ward}`)).data;
    }

}

export const buildingService = new BuildingService();