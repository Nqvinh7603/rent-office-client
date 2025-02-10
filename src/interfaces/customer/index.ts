import { ConsignmentStatus, RequireType } from "../common/enums";

export interface ICustomer {
    customerId: number;
    customerName: string;
    phoneNumber: string;
    email: string;
    address: string;
    requireType: RequireType;
    consignments: IConsignment[];
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
    rejectionReason?: string;
    price: number;
    status: ConsignmentStatus;
    consignmentImages: IConsignmentImage[];
    createdAt: string;
    updatedAt?: string;
}

export interface IConsignmentImage {
    consignmentImageId: number;
    imgUrl?: string;
}