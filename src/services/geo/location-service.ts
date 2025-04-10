import axios from 'axios';

export const locationService = {
    getLocation: async (latitude: number, longitude: number) => {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
            params: {
                lat: latitude,
                lon: longitude,
                format: 'json',
            },
        });
        return response.data;
    },
};