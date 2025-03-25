import { IBuildingType } from "../building";
import { ConsignmentStatus, Orientation, RequireType } from "../common/enums";

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
    //rentalPricing: IRentalPricing[];
    buildingUnits: IBuildingUnit[];
    buildingImages: IConsignmentImageUpdate[];
    consignmentStatusHistories: IConsignmentStatusHistoryUpdate[];
    buildingType: IBuildingType;
    fees: IFee[];
    createdAt: string;
    updatedAt?: string;
    paymentPolicies: IPaymentPolicy[];
    customer: ICustomerUpdate;
}

export interface IBuildingUnit {
    buildingUnitId: number;
    unitName?: string;
    floor: number;
    rentalPricing: IRentalPricing[];
    rentAreas: IRentArea[];
    createdAt: string;
    updatedAt?: string;
}

export interface IRentArea {
    rentAreaId: number;
    area: number;
    createdAt: string;
    updatedAt?: string;
}

export interface IConsignmentImageUpdate {
    buildingImageId: number;
    imgUrl?: string;
}

export interface IConsignmentStatusHistoryUpdate {
    consignmentStatusHistoryId: number;
    status: ConsignmentStatus;
    note?: string;
    createdAt: string;
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