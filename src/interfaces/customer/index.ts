import { ConsignmentStatus, Orientation, PotentialCustomer, RequireType } from "../common/enums";

export interface ICustomer {
    customerId: number;
    customerName: string;
    phoneNumber: string;
    email: string;
    address: string;
    status?: PotentialCustomer;
    requireType: RequireType;
    buildings: IConsignment[];
    note?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface IConsignment {
    buildingId: number;
    buildingName: string;
    numberOfFloors: number;
    totalArea: number;
    ward: string;
    district: string;
    city: string;
    buildingNumber: string;
    street: string;
    description: string;
    orientation: Orientation;
    rentalPricing: IRentalPricing[];
    buildingImages: IConsignmentImage[];
    consignmentStatusHistories: IConsignmentStatusHistory[];
    buildingType: IBuildingType;
    fees: IFee[];
    createdAt: string;
    updatedAt?: string;
    paymentPolicies: IPaymentPolicy[];
}

export interface IConsignmentStatusHistory {
    status: ConsignmentStatus;
}

export interface IConsignmentImage {
    buildingImageId: number;
    imgUrl?: string;
}

export interface IBuildingType {
    buildingTypeId: number;
    buildingTypeName: string;
    buildingTypeCode: string;
    description: string;
    createdAt: string;
    updatedAt?: string;
}

export interface IRentalPricing {
    rentalPricingId: number;
    price: number;
    createdAt: string;
    updatedAt?: string;
}

export interface IFee {
    feeId: number;
    feePricing: IFeePricing[];
    feeType: IFeeType;
    createdAt: string;
    updatedAt?: string;
}

export interface IFeeType {
    feeTypeId: number;
    feeTypeName: string;
    createdAt: string;
    updatedAt?: string;
}

export interface IFeePricing {
    feePricingId: number;
    priceUnit?: string;
    priceValue?: number;
    description?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface IPaymentPolicy {
    paymentPolicyId: number;
    paymentCycle: string;
    depositTerm: number;
    createdAt: string;
    updatedAt?: string;
}