import {
  ClockCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/ky-gui");
  };

  return (
    <header className="shadow-md">
      <div className="bg-white py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <a href="/">
              <img
                src="/src/assets/image/logo.png"
                alt="Cyber Real"
                className="w-35 h-10"
              />
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
          </div>

          {/* Button Navigate */}
          <Button
            type="primary"
            icon={<StarOutlined />}
            className="border-none bg-yellow-500 text-base font-semibold text-white hover:!bg-yellow-600"
            onClick={handleNavigate} // Thêm sự kiện onClick
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
