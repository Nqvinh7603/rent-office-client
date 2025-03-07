import { ApiResponse, ICustomer } from "../../interfaces";
import { createApiClient } from "../api-client";

interface ICustomersService {

    createPotentialCustomer(newPotentialCustomer: Omit<ICustomer, "customerId">): Promise<ApiResponse<ICustomer>>;

}

const apiClient = createApiClient("customers");

class CustomerService implements ICustomersService {

    async createPotentialCustomer(newPotentialCustomer: Omit<ICustomer, "customerId">): Promise<ApiResponse<ICustomer>> {
        return (await apiClient.post("", newPotentialCustomer)).data;
    }

}

export const customerService = new CustomerService();
