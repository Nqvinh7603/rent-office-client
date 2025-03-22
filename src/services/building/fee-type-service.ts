import { ApiResponse, IFeeType } from "../../interfaces";
import { createApiClient } from "../api-client";

interface IFeeTypesService {

    getAllFeeTypes(): Promise<ApiResponse<IFeeType[]>>;

}

const apiClient = createApiClient("fee-types");

class FeeTypeService implements IFeeTypesService {

    async getAllFeeTypes(): Promise<ApiResponse<IFeeType[]>> {
        return (await apiClient.get("/all")).data;
    }
}

export const feeTypeService = new FeeTypeService();
