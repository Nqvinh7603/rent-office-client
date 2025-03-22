import { IBuilding } from "../client";
import { AppointmentStatus, PotentialCustomer, RequireType } from "../common/enums";

export interface IAppointment {
    appointmentId: number;
    appointmentDate: string;
    appointmentStatus: AppointmentStatus;
    buildings: IBuilding[];
    createdAt: string;
    updatedAt?: string;
}

export interface ICustomerAppointment {
    customerId: number;
    customerName: string;
    phoneNumber: string;
    email: string;
    //address: string;
    status?: PotentialCustomer;
    requireType: RequireType;
    appointments: IAppointment[];
    note?: string;
    createdAt: string;
    updatedAt?: string;
}