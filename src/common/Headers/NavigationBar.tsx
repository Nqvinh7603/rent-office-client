import { DownOutlined, HomeOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetProvinces } from "../../hooks";
import useStickyNavigation from "../../hooks/useStickyNavigation";
import { IDistrict } from "../../interfaces";
import { RootState } from "../../redux/store";

const NavigationBar: React.FC = () => {
  const { provinces } = useGetProvinces();
  const isSticky = useStickyNavigation();
  const selectedRegion = useSelector(
    (state: RootState) => state.region.selectedRegion,
  );
  const [districtOptions, setDistrictOptions] = useState<IDistrict[]>([]);

  useEffect(() => {
    const region = provinces?.find(
      (item) => item.code === Number(selectedRegion),
    );
    setDistrictOptions(region?.districts || []);
  }, [selectedRegion, provinces]);

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
            <li>
              <Dropdown
                menu={{
                  items: menuItems,
                  className: "grid grid-cols-3 gap-1",
                }}
              >
                <a
                  href="#"
                  className="flex items-center hover:underline"
                  style={{ fontSize: "14px" }}
                >
                  Văn Phòng Theo Quận <DownOutlined className="ml-1" />
                </a>
              </Dropdown>
            </li>
            <li>
              <Dropdown menu={{ items: menuItems }}>
                <a
                  href="#"
                  className="flex items-center hover:underline"
                  style={{ fontSize: "14px" }}
                >
                  Văn Phòng Trọn Gói <DownOutlined className="ml-1" />
                </a>
              </Dropdown>
            </li>
            <li>
              <Dropdown>
                <a
                  href="#"
                  className="flex items-center hover:underline"
                  style={{ fontSize: "14px" }}
                >
                  Văn Phòng Hạng A <DownOutlined className="ml-1" />
                </a>
              </Dropdown>
            </li>
            <li>
              <Dropdown menu={{ items: menuItems }}>
                <a
                  href="#"
                  className="flex items-center hover:underline"
                  style={{ fontSize: "14px" }}
                >
                  Văn Phòng Giá Rẻ <DownOutlined className="ml-1" />
                </a>
              </Dropdown>
            </li>
            <li>
              <Dropdown menu={{ items: menuItems }}>
                <a
                  href="#"
                  className="flex items-center hover:underline"
                  style={{ fontSize: "14px" }}
                >
                  Thuê Toà Nhà <DownOutlined className="ml-1" />
                </a>
              </Dropdown>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default NavigationBar;
