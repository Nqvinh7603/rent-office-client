import { ApiResponse, ICustomer } from "../../interfaces";
import { IConsignmentUpdate } from "../../interfaces/consignment";
import { createApiClient } from "../api-client";

export interface ICustomerService {
    createCustomerWithConsignment(customer: FormData): Promise<ApiResponse<ICustomer>>;
    getConsignmentById(consignmentId: number): Promise<ApiResponse<IConsignmentUpdate>>;
    update(consignmentId: string, updatedConsignment: FormData): Promise<ApiResponse<IConsignmentUpdate>>;
    verifyToken(consignmentId: string, token: string): Promise<ApiResponse<void>>;
}

const apiClient = createApiClient("consignments");

class CustomerService implements ICustomerService {
    async getConsignmentById(consignmentId: number): Promise<ApiResponse<IConsignmentUpdate>> {
        return (await apiClient.get(`/${consignmentId}`)).data;
    }
    async update(
        consignmentId: string,
        updatedConsignment: FormData,
    ): Promise<ApiResponse<IConsignmentUpdate>> {
        return (await apiClient.put(`/${consignmentId}`, updatedConsignment)).data;
    }

    async createCustomerWithConsignment(customer: FormData): Promise<ApiResponse<ICustomer>> {
        return (await apiClient.post<ApiResponse<ICustomer>>("", customer)).data;
    }
    async verifyToken(consignmentId: string, token: string): Promise<ApiResponse<void>> {
        return (
            await apiClient.get(`/${consignmentId}/verify-token`, {
                params: { token },
            })
        ).data;
    }
}

export const customerService = new CustomerService();