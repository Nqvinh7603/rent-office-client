
export interface IAppointment {
    appointmentBuildings: IAppointmentBuilding[];
}

export interface ICustomerAppointment {
    customerName: string;
    phoneNumber: string;
    email: string;
    note?: string;
    appointments: IAppointment[];
}

export interface IAppointmentBuilding {
    buildingId: number;
    visitTime: string;
    area: string;
}
