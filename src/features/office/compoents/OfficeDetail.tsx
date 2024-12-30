import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
const OfficeDetail: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="mb-6 flex items-center space-x-2 text-gray-500">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          className="flex items-center text-gray-700 hover:text-black"
          onClick={handleNavigateHome}
        />
        <span className="text-sm font-medium uppercase">
          <span
            className="cursor-pointer hover:text-black"
            onClick={handleNavigateHome}
          >
            TRANG CHỦ
          </span>
          {" / "}
          <span
            className="cursor-pointer hover:text-black"
            onClick={handleNavigateHome}
          >
            KÝ GỬI VĂN PHÒNG
          </span>
        </span>
      </div>
    </div>
  );
};
export default OfficeDetail;
