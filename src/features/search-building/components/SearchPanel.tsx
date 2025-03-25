import { AudioOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProvinces } from "../../../hooks";
import { IDistrict, IWard } from "../../../interfaces";
import { ORENTATION_TRANSLATIONS } from "../../../interfaces/common/constants";
import { useAppSelector } from "../../../redux/hook";
import { buildingService } from "../../../services/building/building-service";
import { formatCurrency } from "../../../utils";

const SearchPanel: React.FC = () => {
  const { provinces } = useGetProvinces();
  const navigate = useNavigate();
  const selectedRegion = useAppSelector((state) => state.region.selectedRegion);
  const [districtOptions, setDistrictOptions] = useState<IDistrict[]>([]);
  const [wardOptions, setWardOptions] = useState<IWard[]>([]);
  const [streetOptions, setStreetOptions] = useState<string[]>([]);
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

  useEffect(() => {
    const fetchStreets = async () => {
      if (selectedWard && selectedDistrict) {
        try {
          const districtName = districtOptions.find(
            (district) => district.code === Number(selectedDistrict),
          )?.name;

          const wardName = wardOptions.find(
            (ward) => ward.code === Number(selectedWard),
          )?.name;

          if (wardName && districtName) {
            const response = await buildingService.getAllStreet(
              wardName,
              districtName,
            );
            setStreetOptions(response.payload ?? []);
          } else {
            setStreetOptions([]);
          }
        } catch (error) {
          console.error("Failed to fetch streets:", error);
          setStreetOptions([]);
        }
      } else {
        setStreetOptions([]);
      }
    };

    fetchStreets();
  }, [selectedWard, selectedDistrict]);

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    if (selectedDistrict) {
      const districtName = districtOptions.find(
        (district) => district.code === Number(selectedDistrict),
      )?.name;
      if (districtName) {
        queryParams.append("district", districtName);
      }
    }
    if (selectedWard) {
      const wardName = wardOptions.find(
        (ward) => ward.code === Number(selectedWard),
      )?.name;
      if (wardName) {
        queryParams.append("ward", wardName);
      }
    }
    if (selectedStreet) {
      queryParams.append("street", selectedStreet);
    }
    if (selectedArea) {
      if (selectedArea.startsWith("minArea")) {
        queryParams.append("minArea", selectedArea.split("=")[1]);
      } else if (selectedArea.startsWith("maxArea")) {
        queryParams.append("maxArea", selectedArea.split("=")[1]);
      }
    }

    // Handle price correctly
    if (selectedPrice) {
      if (selectedPrice.startsWith("minPrice")) {
        queryParams.append("minPrice", selectedPrice.split("=")[1]);
      } else if (selectedPrice.startsWith("maxPrice")) {
        queryParams.append("maxPrice", selectedPrice.split("=")[1]);
      }
    }

    if (selectedDirection) {
      queryParams.append("orientation", selectedDirection);
    }

    // Navigate to the OfficeList page with the constructed query string
    window.location.href = `/van-phong?${queryParams.toString()}`;
  };

  return (
    <div className="-translate-y-18 relative bottom-12 left-1/2 z-10 w-11/12 -translate-x-1/2 transform rounded-md bg-white p-4 shadow-lg lg:w-3/4">
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Input
          placeholder="Nhập tên tòa nhà, ví dụ: Vincom, Vietcombank, International Plaza..."
          className="col-span-3 rounded-md border px-4 py-2 md:col-span-3 lg:col-span-3"
          suffix={
            <AudioOutlined
              style={{
                fontSize: 16,
              }}
              onClick={() => {
                if (
                  navigator.mediaDevices &&
                  navigator.mediaDevices.getUserMedia
                ) {
                  navigator.mediaDevices
                    .getUserMedia({ audio: true })
                    .then((stream) => {
                      console.log("Voice input activated");
                    })
                    .catch((err) => {
                      console.error("Error accessing audio input: ", err);
                    });
                } else {
                  console.error("getUserMedia not supported on your browser!");
                }
              }}
            />
          }
        />
        <Button
          type="primary"
          className="py-4 text-white"
          onClick={handleSearch}
        >
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
          optionFilterProp="label"
          filterOption={(input, option) =>
            (String(option?.children) ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {districtOptions.map((district) => (
            <Select.Option key={district.code} value={district.code}>
              {district.name}
            </Select.Option>
          ))}
        </Select>

        <Select
          showSearch
          placeholder="Tất cả phường/xã"
          className="w-full rounded-md border"
          allowClear
          value={selectedWard}
          onChange={setSelectedWard}
          optionFilterProp="label"
          filterOption={(input, option) =>
            (String(option?.children) ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
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
          {streetOptions.map((street, index) => (
            <Select.Option key={index} value={street}>
              {street}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
        <Select
          placeholder="Tất cả diện tích"
          className="w-full rounded-md border"
          allowClear
          value={selectedArea}
          onChange={(value) => setSelectedArea(value)}
          showSearch
          options={[
            {
              label: "Dưới 50m²",
              value: "maxArea=50",
            },
            {
              label: "Dưới 100m²",
              value: "maxArea=100",
            },
            {
              label: "Dưới 200m²",
              value: "maxArea=200",
            },
            {
              label: "Dưới 500m²",
              value: "maxArea=500",
            },
            {
              label: "Trên 500m²",
              value: "minArea=500",
            },
          ]}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
        <Select
          placeholder="Tất cả giá"
          className="w-full rounded-md border"
          allowClear
          value={selectedPrice}
          onChange={(value) => setSelectedPrice(value)}
          showSearch
          options={[
            {
              label: `Dưới ${formatCurrency(300000)} VNĐ/m²`,
              value: "maxPrice=300000",
            },
            {
              label: `Dưới ${formatCurrency(500000)} VNĐ/m²`,
              value: "maxPrice=500000",
            },
            {
              label: `Trên ${formatCurrency(500000)} VNĐ/m²`,
              value: "minPrice=500000",
            },
            {
              label: `Dưới ${formatCurrency(1000000)} VNĐ/m²`,
              value: "maxPrice=1000000",
            },
            {
              label: `Dưới ${formatCurrency(2000000)} VNĐ/m²`,
              value: "maxPrice=2000000",
            },
            {
              label: `Trên ${formatCurrency(2000000)} VNĐ/m²`,
              value: "minPrice=2000000",
            },
            {
              label: `Dưới ${formatCurrency(3000000)} VNĐ/m²`,
              value: "maxPrice=2000000",
            },
          ]}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />

        <Select
          placeholder="Chọn hướng"
          allowClear
          showSearch
          options={Object.entries(ORENTATION_TRANSLATIONS).map(
            ([value, label]) => ({
              label,
              value,
            }),
          )}
          onChange={setSelectedDirection}
        />
      </div>
    </div>
  );
};

export default SearchPanel;
