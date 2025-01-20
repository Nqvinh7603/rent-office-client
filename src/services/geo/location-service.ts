import axios from "axios";

class LocationService {
    async getLocation(latitude: number, longitude: number) {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        return response.data;
    }
}

export const locationService = new LocationService();


