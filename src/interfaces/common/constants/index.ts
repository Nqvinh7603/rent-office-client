import { Orientation } from "../enums";

export const ORENTATION_TRANSLATIONS: Record<Orientation, string> = {
    [Orientation.NORTH]: "Hướng Bắc",
    [Orientation.SOUTH]: "Hướng Nam",
    [Orientation.EAST]: "Hướng Đông",
    [Orientation.WEST]: "Hướng Tây",
    [Orientation.NORTHEAST]: "Hướng Đông Bắc",
    [Orientation.NORTHWEST]: "Hướng Tây Bắc",
    [Orientation.SOUTHEAST]: "Hướng Đông Nam",
    [Orientation.SOUTHWEST]: "Hướng Tây Nam",
    [Orientation.UNDETERMINED]: "Chưa xác định",
}