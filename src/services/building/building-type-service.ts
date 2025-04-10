import { ApiResponse, IBuildingType } from "../../interfaces";
import { createApiClient } from "../api-client";

interface IBuildingTypesService {

    getAllBuildingTypes(): Promise<ApiResponse<IBuildingType[]>>;

}

const apiClient = createApiClient("building-types");

class BuildingTypeService implements IBuildingTypesService {

    async getAllBuildingTypes(): Promise<ApiResponse<IBuildingType[]>> {
        return (await apiClient.get("/all")).data;
    }
}

export const buildingTypeService = new BuildingTypeService();
