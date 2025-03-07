import { ConsignmentStatus, PotentialCustomer, RequireType } from "../common/enums";

export interface ICustomer {
    customerId: number;
    customerName: string;
    phoneNumber: string;
    email: string;
    address: string;
    status?: PotentialCustomer;
    requireType: RequireType;
    consignments: IConsignment[];
    note?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface IConsignment {
    consignmentId: number;
    ward: string;
    district: string;
    city: string;
    description: string;
    buildingType: string;
    price: number;
    consignmentImages: IConsignmentImage[];
    consignmentStatusHistories: IConsignmentStatusHistory[];
    createdAt: string;
    updatedAt?: string;
}

export interface IConsignmentStatusHistory {
    // consignmentStatusHistoryId: number;
    status: ConsignmentStatus;
    // note?: string;
    // createdAt: string;
    // createdBy: string;
    // updatedAt?: string;
    // updatedBy?: string;
}

export interface IConsignmentImage {
    consignmentImageId: number;
    imgUrl?: string;
}