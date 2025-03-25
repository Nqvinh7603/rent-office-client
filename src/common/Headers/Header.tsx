import {
  ClockCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Button, Select } from "antd";
import React, { useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetProvinces } from "../../hooks";
import useGeolocation from "../../hooks/useLocation";
import { setSelectedRegion } from "../../redux/slices/regionSlice";
import { RootState } from "../../redux/store";
import NavigationBar from "./NavigationBar";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { provinces } = useGetProvinces();
  const selectedRegion = useSelector(
    (state: RootState) => state.region.selectedRegion,
  );
  const { fetchLocationUsingGeolocation } = useGeolocation(provinces);

  const handleNavigate = () => {
    navigate("/ky-gui");
  };

  const addressOptions = Array.isArray(provinces)
    ? provinces.map((item) => ({
        label: item.name,
        value: item.code,
      }))
    : [];

  const handleProvinceChange = (value: string) => {
    dispatch(setSelectedRegion(value));
  };

  useEffect(() => {
    if (provinces && provinces.length > 0) {
      const hoChiMinh = provinces.find(
        (province) => province.name.toLowerCase() === "hồ chí minh",
      );
      if (hoChiMinh) {
        dispatch(setSelectedRegion(hoChiMinh.name));
      }
    }
  }, [provinces, dispatch]);

  return (
    <header className="shadow-md">
      <div className="bg-white py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <a href="/">
              <img src="/logo.png" alt="Cyber Real" className="w-35 h-10" />
            </a>
          </div>

          <div className="hidden space-x-14 text-gray-700 md:flex">
            <div className="flex items-center">
              <ClockCircleOutlined className="mr-2 text-4xl" />
              <div>
                <span className="block text-xs">Thời gian làm việc</span>
                <h6 className="text-base font-semibold">24/7</h6>
              </div>
            </div>
            <div className="flex items-center">
              <PhoneOutlined className="mr-2 text-4xl" />
              <div>
                <span className="block text-xs">Hotline</span>
                <h6 className="text-base font-semibold">0919.463.436</h6>
              </div>
            </div>
            <div className="flex items-center">
              <MailOutlined className="mr-2 text-4xl" />
              <div>
                <span className="block text-xs">Email tư vấn</span>
                <h6 className="text-base font-semibold">info@cyberreal.vn</h6>
              </div>
            </div>
            <div className="flex items-center">
              <IoLocationOutline size={28} className="-mr-2" />
              <Select
                className="text-base font-semibold"
                showSearch
                value={
                  addressOptions.find(
                    (option) => Number(option.value) === Number(selectedRegion),
                  )?.label
                }
                placeholder="Chọn khu vực "
                optionFilterProp="label"
                options={addressOptions}
                onChange={handleProvinceChange}
                bordered={false}
                filterOption={(input, option) =>
                  option?.label.toLowerCase().includes(input.toLowerCase()) ??
                  false
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
              />
            </div>
          </div>
          <Button
            type="primary"
            icon={<StarOutlined />}
            className="border-none bg-yellow-500 text-base font-semibold text-white hover:!bg-yellow-600"
            onClick={handleNavigate}
          >
            Kí gửi
          </Button>
        </div>
      </div>
      <NavigationBar />
    </header>
  );
};

export default Header;
