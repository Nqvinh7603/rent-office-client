import { useEffect, useState } from "react";
import { useGetProvinces } from "../../../hooks";

export const useAddressOptions = (): {
    addressOptions: { label: string; value: number }[];
    districtOptions: { label: string; value: number }[];
    wardOptions: { label: string; value: number }[];
    selectedRegion: string | null;
    setSelectedRegion: React.Dispatch<React.SetStateAction<string | null>>;
    selectedDistrict: string | null;
    setSelectedDistrict: React.Dispatch<React.SetStateAction<string | null>>;
    selectedWard: string | null;
    setSelectedWard: React.Dispatch<React.SetStateAction<string | null>>;
} => {
    const { provinces } = useGetProvinces();
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [districtOptions, setDistrictOptions] = useState<{ label: string; value: number }[]>([]);
    const [wardOptions, setWardOptions] = useState<{ label: string; value: number }[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [selectedWard, setSelectedWard] = useState<string | null>(null);

    useEffect(() => {
        const region = provinces?.find(
            (item) => item.code === Number(selectedRegion),
        );
        const allDistricts = region?.districts || [];
        setDistrictOptions(allDistricts.map(district => ({
            label: district.name,
            value: district.code,
        })));

        const district = allDistricts.find(
            (item) => item.code === Number(selectedDistrict),
        );
        setWardOptions(
            (district?.wards || allDistricts.flatMap((district) => district.wards || [])).map(ward => ({
                label: ward.name,
                value: ward.code,
            })),
        );
    }, [selectedRegion, selectedDistrict, provinces]);

    const addressOptions = Array.isArray(provinces)
        ? provinces.map((item) => ({
            label: item.name,
            value: item.code,
        }))
        : [];

    return {
        addressOptions,
        districtOptions,
        wardOptions,
        selectedRegion,
        setSelectedRegion,
        selectedDistrict,
        setSelectedDistrict,
        selectedWard,
        setSelectedWard,
    };
};
