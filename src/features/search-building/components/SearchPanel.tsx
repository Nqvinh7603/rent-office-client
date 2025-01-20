import { Button, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { IDistrict, IWard } from "../../../interfaces";
import { useAppSelector } from "../../../redux/hook";
import { useGetProvinces } from "../../../hooks";

const SearchPanel: React.FC = () => {
  const { provinces } = useGetProvinces();
  const selectedRegion = useAppSelector((state) => state.region.selectedRegion);
  const [districtOptions, setDistrictOptions] = useState<IDistrict[]>([]);
  const [wardOptions, setWardOptions] = useState<IWard[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedWard, setSelectedWard] = useState<string | null>(null);
  const [selectedStreet, setSelectedStreet] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedDirection, setSelectedDirection] = useState<string | null>(
    null,
  );

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

  useEffect(() => {
    setSelectedDistrict(null);
    setSelectedWard(null);
    setSelectedStreet(null);
    setSelectedArea(null);
    setSelectedPrice(null);
    setSelectedDirection(null);
  }, [selectedRegion]);

  return (
    <div className="-translate-y-18 relative bottom-12 left-1/2 z-10 w-11/12 -translate-x-1/2 transform rounded-md bg-white p-4 shadow-lg lg:w-3/4">
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Input
          placeholder="Nhập tên tòa nhà, ví dụ: Vincom, Vietcombank, International Plaza..."
          className="col-span-3 rounded-md border px-4 py-2 md:col-span-3 lg:col-span-3"
        />
        <Button type="primary" className="py-4 text-white">
          TÌM KIẾM
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
        <Select
          showSearch
          placeholder="Tất cả quận huyện"
          className="w-full rounded-md border"
          allowClear
          value={selectedDistrict}
          onChange={setSelectedDistrict}
          filterOption={(input, option) =>
            (option?.children
              ?.toString()
              .toLowerCase()
              .indexOf(input.toLowerCase()) ?? -1) >= 0
          }
        >
          {districtOptions.map((district) => (
            <Select.Option key={district.code} value={district.code}>
              {district.name}
            </Select.Option>
          ))}
        </Select>

        <Select
          placeholder="Tất cả phường/xã"
          className="w-full rounded-md border"
          allowClear
          value={selectedWard}
          onChange={setSelectedWard}
          filterOption={(input, option) =>
            (option?.children
              ?.toString()
              .toLowerCase()
              .indexOf(input.toLowerCase()) ?? -1) >= 0
          }
        >
          {wardOptions.map((ward) => (
            <Select.Option key={ward.code} value={ward.code}>
              {ward.name}
            </Select.Option>
          ))}
        </Select>

        <Select
          placeholder="Tất cả đường"
          className="w-full rounded-md border"
          allowClear
          value={selectedStreet}
          onChange={setSelectedStreet}
        >
          <Select.Option value="duong-a">Đường A</Select.Option>
          <Select.Option value="duong-b">Đường B</Select.Option>
        </Select>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
        <Select
          placeholder="Tất cả diện tích"
          className="w-full rounded-md border"
          allowClear
          value={selectedArea}
          onChange={setSelectedArea}
        >
          <Select.Option value="50m2">Dưới 50m2</Select.Option>
          <Select.Option value="100m2">Dưới 100m2</Select.Option>
        </Select>

        <Select
          placeholder="Tất cả giá"
          className="w-full rounded-md border"
          allowClear
          value={selectedPrice}
          onChange={setSelectedPrice}
        >
          <Select.Option value="5tr">Dưới 5 triệu</Select.Option>
          <Select.Option value="10tr">Dưới 10 triệu</Select.Option>
        </Select>

        <Select
          placeholder="Tất cả hướng"
          className="w-full rounded-md border"
          allowClear
          value={selectedDirection}
          onChange={setSelectedDirection}
        >
          <Select.Option value="dong">Hướng Đông</Select.Option>
          <Select.Option value="tay">Hướng Tây</Select.Option>
        </Select>
      </div>
    </div>
  );
};

export default SearchPanel;
