import { ConsignmentStatus, Orientation, RequireType } from "../common/enums";

export interface IBuildingType {
    buildingTypeId: number;
    buildingTypeName: string;
    buildingTypeCode: string;
    description?: string;
    createdAt: string;
    updatedAt?: string;
}


export interface IBuildingLevel {
    buildingLevelId: number;
    buildingLevelCode: string;
    buildingLevelName: string;
    description?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface IFeeType {
    feeTypeId: number;
    feeTypeName: string;
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



export interface IBuildingUnit {
    buildingUnitId: number;
    unitName?: string;
    floor: number;
    rentAreas: IRentArea[];
    rentalPricing: IRentalPricing[];
    createdAt: string;
    updatedAt?: string;
}

export interface IRentArea {
    rentAreaId: number;
    area: number;
    createdAt: string;
    updatedAt?: string;
}


export interface IAddress {
    name: string;
    code: number;
    codename?: string;
    divisionType?: string;
    phoneCode?: string;
    districts?: IDistrict[];
}

export interface IDistrict {
    name: string;
    code: number;
    codename?: string;
    divisionType?: string;
    shortCodename?: string;
    wards?: IWard[];
}

export interface IWard {
    name: string;
    code: number;
    codename?: string;
    divisionType?: string;
    shortCodename?: string;
}

export interface ILocationData {
    latitude?: number;
    longitude?: number;
    accuracy?: number;
    error?: string;
}

export interface ICustomer {
    customerId: number;
    customerName: string;
    phoneNumber: string;
    email: string;
    address: string;
    requireType: RequireType;
    note?: string;
    // status?: PotentialCustomerStatus;
    createdAt: string;
    updatedAt?: string;
}

export interface IBuilding {
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
    //rentalPricing: IRentalPricing[];
    orientation: Orientation;
    buildingImages: IBuildingImage[];
    consignmentStatusHistories: IBuildingStatusHistory[];
    buildingUnits: IBuildingUnit[];
    // status: BuildingStatus;
    buildingLevel: IBuildingLevel;
    buildingType: IBuildingType;
    fees: IFee[];
    createdAt: string;
    updatedAt?: string;
    paymentPolicies: IPaymentPolicy[];
    customer: ICustomer;
}

export interface IBuildingImage {
    buildingImageId: number;
    imgUrl?: string;
}

export interface IBuildingStatusHistory {
    consignmentStatusHistoryId: number;
    status: ConsignmentStatus;
    note: string;
    createdAt: string;
    createdBy: string;
    updatedAt?: string;
    updatedBy?: string;
}

export interface BuildingFilterCriteria {
    email?: string;
    customerName?: string;
    phoneNumber?: string;
    buildingType?: string;
    district?: string;
    city?: string;
    ward?: string;
    street?: string;
    maxPrice?: number;
    minPrice?: number;
    staffName?: string;
    status?: ConsignmentStatus;
    orientation?: Orientation;
}


export interface BuildingCompanyFilterCriteria {
    email?: string;
    customerName?: string;
    phoneNumber?: string;
    buildingType?: string;
    buildingLevel?: string;
    district?: string;
    city?: string;
    ward?: string;
    street?: string;
    maxPrice?: number;
    minPrice?: number;
    minArea?: number;
    maxArea?: number;
    staffName?: string;
    // buildingStatus?: BuildingStatus;
    orientation?: Orientation;
    buildingName?: string;
    searchQuery?: string;
    // buildingName?: string;
}


export interface IRentalPricing {
    rentalPricingId: number;
    price: number;
    createdAt: string;
    createdBy: string;
    updatedAt?: string;
}

export interface IFee {
    feeId: number;
    feePricing: IFeePricing[];
    feeType: IFeeType;
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