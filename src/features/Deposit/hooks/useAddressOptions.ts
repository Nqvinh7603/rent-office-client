import { useEffect, useState } from "react";
import { useGetProvinces } from "../../../hooks";
import { IDistrict, IWard } from "../../../interfaces";

export const useAddressOptions = (): {
    addressOptions: { label: string; value: number }[];
    districtOptions: IDistrict[];
    wardOptions: IWard[];
    selectedRegion: string | null;
    setSelectedRegion: React.Dispatch<React.SetStateAction<string | null>>;
    selectedDistrict: string | null;
    setSelectedDistrict: React.Dispatch<React.SetStateAction<string | null>>;
    selectedWard: string | null;
    setSelectedWard: React.Dispatch<React.SetStateAction<string | null>>;
} => {
    const { provinces } = useGetProvinces();
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [districtOptions, setDistrictOptions] = useState<IDistrict[]>([]);
    const [wardOptions, setWardOptions] = useState<IWard[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [selectedWard, setSelectedWard] = useState<string | null>(null);

    useEffect(() => {
        const region = provinces?.find(
            (item) => item.code === Number(selectedRegion),
        );
        const allDistricts = region?.districts || [];
        setDistrictOptions(allDistricts);

        const district = allDistricts.find(
            (item) => item.code === Number(selectedDistrict),
        );
        setWardOptions(
            district?.wards ||
            allDistricts.flatMap((district) => district.wards || []),
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
