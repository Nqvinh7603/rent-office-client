import { DownOutlined, HomeOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Dropdown, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetProvinces } from "../../hooks";
import useStickyNavigation from "../../hooks/useStickyNavigation";
import { IDistrict } from "../../interfaces";
import { RootState } from "../../redux/store";
import { buildingLevelService } from "../../services/building/building-level-service";

const NavigationBar: React.FC = () => {
  const { provinces } = useGetProvinces();
  const isSticky = useStickyNavigation();
  const selectedRegion = useSelector(
    (state: RootState) => state.region.selectedRegion,
  );
  const [districtOptions, setDistrictOptions] = useState<IDistrict[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["building-levels"],
    queryFn: () => buildingLevelService.getAllBuildingLevels(),
  });

  useEffect(() => {
    const region = provinces?.find(
      (item) => item.code === Number(selectedRegion),
    );
    setDistrictOptions(region?.districts || []);
  }, [selectedRegion, provinces]);

  const buildingLevels = data?.payload || [];

  const menuItems = Array.isArray(districtOptions)
    ? districtOptions.map((district) => ({
        key: district.code,
        label: district.name,
      }))
    : [];

  return (
    <div>
      <nav
        className={`box-shadow w-full bg-[var(--color-primary)] py-5 transition-all duration-300 ${
          isSticky
            ? "fixed top-0 z-50 translate-y-0 transform shadow-lg"
            : "relative"
        }`}
      >
        <div className="container mx-auto flex items-center justify-center px-4">
          <ul className="flex space-x-6 font-medium text-white">
            <li>
              <a
                href="/"
                className="flex items-center hover:underline"
                style={{ fontSize: "14px" }}
              >
                <HomeOutlined className="mr-1" /> Trang chủ
              </a>
            </li>

            {isLoading ? (
              <li>
                <Spin size="small" />
              </li>
            ) : isError ? (
              <li className="text-red-500">Lỗi tải dữ liệu</li>
            ) : (
              buildingLevels
                .sort((a, b) =>
                  a.buildingLevelName.localeCompare(b.buildingLevelName),
                )
                .map((level) => (
                  <li key={level.buildingLevelId} className="group relative">
                    <Dropdown menu={{ items: menuItems }}>
                      <a
                        href={`#building-level-${level.buildingLevelId}`}
                        className="flex items-center hover:underline"
                        style={{ fontSize: "14px" }}
                      >
                        Văn phòng {level.buildingLevelName}{" "}
                        <DownOutlined className="ml-1" />
                      </a>
                    </Dropdown>
                  </li>
                ))
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
