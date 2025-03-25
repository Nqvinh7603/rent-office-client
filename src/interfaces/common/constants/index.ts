import { Orientation } from "../enums";

export const ORENTATION_TRANSLATIONS: Record<Orientation, string> = {
    [Orientation.NORTH]: "Bắc",
    [Orientation.SOUTH]: "Nam",
    [Orientation.EAST]: "Đông",
    [Orientation.WEST]: "Tây",
    [Orientation.NORTHEAST]: "Đông Bắc",
    [Orientation.NORTHWEST]: "Tây Bắc",
    [Orientation.SOUTHEAST]: "Đông Nam",
    [Orientation.SOUTHWEST]: "Tây Nam",
    [Orientation.UNDETERMINED]: "Chưa xác định",
}