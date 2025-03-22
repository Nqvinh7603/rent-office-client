import { ApiResponse, BuildingCompanyFilterCriteria, IBuilding, Page, PaginationParams } from "../../interfaces";
import { createApiClient } from "../api-client";

export interface IBuildingService {

    getBuildingById(buildingId: number): Promise<ApiResponse<IBuilding>>;
    getBuildingCompanys(pagination: PaginationParams, filter?: BuildingCompanyFilterCriteria): Promise<ApiResponse<Page<IBuilding>>>;

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

}

export const buildingService = new BuildingService();