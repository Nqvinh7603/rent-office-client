import { useQuery } from "@tanstack/react-query";
import { addressService } from "../services";

export function useGetProvinces() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["provinces"],
        queryFn: () => addressService.getProvinces(3),
    });

    return { provinces: data, error, isLoading };
}
