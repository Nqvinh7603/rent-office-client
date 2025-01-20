import { useDispatch } from 'react-redux';
import { setSelectedRegion } from '../redux/slices/regionSlice';
import { locationService } from '../services';
import { normalizeString } from '../utils';


const useGeolocation = (provinces: any) => {
    const dispatch = useDispatch();

    const fetchLocationUsingGeolocation = async () => {
        if (!("geolocation" in navigator)) {
            console.error("Geolocation API not supported by this browser.");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                try {
                    const { address: { city: regionName } } = await locationService.getLocation(latitude, longitude);

                    const region = provinces?.find((item: any) =>
                        normalizeString(item.name).includes(normalizeString(regionName)),
                    );

                    if (region) {
                        dispatch(setSelectedRegion(region.code.toString()));
                    }
                } catch (error) {
                    console.error("Error fetching location from coordinates:", error);
                }
            },
            (error) => console.error("Error using Geolocation API:", error),
            { enableHighAccuracy: true },
        );
    };

    return { fetchLocationUsingGeolocation };
};

export default useGeolocation;