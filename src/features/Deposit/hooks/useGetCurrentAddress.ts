import { useState } from 'react';
import { locationService } from '../../../services';
export function useGetCurrentAddress() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentAddress, setCurrentAddress] = useState<string>("");

    const fetchCurrentLocation = async () => {
        if (!("geolocation" in navigator)) {
            console.error("Geolocation API not supported by this browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                try {
                    setIsLoading(true);
                    const { display_name } = await locationService.getLocation(latitude, longitude);
                    if (display_name) {
                        setCurrentAddress(display_name);
                    }
                } catch (error) {
                    console.error("Error fetching location from coordinates:", error);
                } finally {
                    setIsLoading(false);
                }
            },
            (error) => {
                console.error("Error using Geolocation API:", error);
                setIsLoading(false);
            },
            { enableHighAccuracy: true },
        );
    };

    return { fetchCurrentLocation, currentAddress, setCurrentAddress, isLoading };
}