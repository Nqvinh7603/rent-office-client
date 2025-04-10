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

export enum Orientation {
    EAST = "EAST", // Đông
    WEST = "WEST", // Tây
    SOUTH = "SOUTH", // Nam
    NORTH = "NORTH", // Bắc
    SOUTHEAST = "SOUTHEAST", // Đông Nam
    NORTHEAST = "NORTHEAST", // Đông Bắc
    SOUTHWEST = "SOUTHWEST", // Tây Nam
    NORTHWEST = "NORTHWEST", // Tây Bắc
    UNDETERMINED = "UNDETERMINED", // Chưa xác định
}


export enum AppointmentStatus {
    PENDING = "PENDING",          // Cuộc hẹn vừa được tạo, đang chờ xử lý
    CONFIRMED = "COMFIRMED",        // Cuộc hẹn đã được xác nhận
    IN_PROGRESS = "IN_PROGRESS",      // Cuộc hẹn đang diễn ra (khách hàng đang xem văn phòng)
    COMPLETED = "COMPLETED",        // Cuộc hẹn đã hoàn tất (khách hàng đã xem xong)
    SUCCESSFUL = "SUCCESSFUL",       // Cuộc hẹn thành công (khách hàng đồng ý thuê văn phòng)
    UNSUCCESSFUL = "UNSUCCESSFUL",     // Cuộc hẹn không thành công (khách hàng không đồng ý thuê)
    CANCELLED = "CANCELLED",        // Cuộc hẹn bị hủy
    FOLLOW_UP = "FOLLOW_UP",        // Cần theo dõi thêm (ví dụ: khách hàng chưa quyết định, cần liên hệ lại)
    RESCHEDULED = "RESCHEUDLED"       // Cuộc hẹn được lên lịch lại (khách hàng yêu cầu đổi thời gian)
}

export enum BuildingUnitStatus {
    AVAILABLE = "AVAILABLE",           // Đang có sẵn để thuê
    RENTED = "RENTED",             // Đã được thuê
    UNDER_MAINTENANCE = "UNDER_MAINTENANCE",  // Đang bảo trì
    RESERVED = "RESERVED",           // Đã có người đặt trước
    UNAVAILABLE = "UNAVAILABLE",         // Không thể cho thuê (chủ tòa nhà không muốn cho thuê)

}