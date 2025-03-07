export enum RequireType {
    RENT = "RENT",
    CONSIGNMENT = "CONSIGNMENT",
}

export enum ConsignmentStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    INCOMPLETE = "INCOMPLETE",
    ADDITIONAL_INFO = "ADDITIONAL_INFO",
}


export enum PotentialCustomer {
    CONTACTED_NO_RESPONSE = "CONTACTED_NO_RESPONSE", // đã liên hệ _ không phản hồi
    CONTACTED_SCHEDULED = "CONTACTED_SCHEDULED", // đã liên hệ _ đã lên lịch
    NOT_CONTACTED = "NOT_CONTACTED", // chưa liên hệ
    DEAL_DONE = "DEAL_DONE", // đã có hợp đồng
    IN_PROGRESS = "IN_PROGRESS", // đang trong quá trình làm việc
    CANCELED = "CANCELED", // đã hủy
}

