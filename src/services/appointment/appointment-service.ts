import { ApiResponse } from "../../interfaces";
import { ICustomerAppointment } from "../../interfaces/appointment";
import { createApiClient } from "../api-client";

interface IAppointmentsService {

    createAppointment(newAppointment: ICustomerAppointment): Promise<ApiResponse<void>>;

}

const apiClient = createApiClient("appointments");

class AppointmentService implements IAppointmentsService {

    async createAppointment(newAppointment: ICustomerAppointment): Promise<ApiResponse<void>> {
        return (await apiClient.post("", newAppointment)).data;
    }
}

export const appointmentService = new AppointmentService();
