import { ApiResponse, ICustomer } from "../../interfaces";
import { createApiClient } from "../api-client";

export interface ICustomerService {
    createCustomerWithConsignment(customer: FormData): Promise<ApiResponse<ICustomer>>;
}

const apiClient = createApiClient("consignments");

class CustomerService implements ICustomerService {
    async createCustomerWithConsignment(customer: FormData): Promise<ApiResponse<ICustomer>> {
        return (await apiClient.post<ApiResponse<ICustomer>>("", customer)).data;
    }
}

export const customerService = new CustomerService();