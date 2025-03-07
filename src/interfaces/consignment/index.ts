import { ConsignmentStatus, RequireType } from "../common/enums";

export interface ICustomerUpdate {
    customerId: number;
    customerName: string;
    phoneNumber: string;
    email: string;
    address: string;
    requireType: RequireType;
    createdAt: string;
    updatedAt?: string;
}

export interface IConsignmentUpdate {
    consignmentId: number;
    ward: string;
    district: string;
    city: string;
    description: string;
    buildingType: string;
    // rejectionReason?: string;
    // additionalInfo?: string;
    price: number;
    // status: ConsignmentStatus;
    consignmentImages: IConsignmentImageUpdate[];
    consignmentStatusHistories: IConsignmentStatusHistoryUpdate[];
    customer: ICustomerUpdate;
    createdAt: string;
    updatedAt?: string;
    // additionalInfoAt?: string;
    // rejectedReasonAt?: string;
    // confirmedAt?: string;
    // additionalInfoAfterAt?: string;

}

export interface IConsignmentImageUpdate {
    consignmentImageId: number;
    imgUrl?: string;
}

export interface IConsignmentStatusHistoryUpdate {
    consignmentStatusHistoryId: number;
    status: ConsignmentStatus;
    note?: string;
    createdAt: string;
}