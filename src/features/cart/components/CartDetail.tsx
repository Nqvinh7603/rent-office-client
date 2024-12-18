import React from "react";
import { Button } from "antd";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CartDetail: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <div className="mx-auto my-8 max-w-7xl px-4 lg:px-8">
      {/* Back Button */}
      <div className="mb-6 flex items-center space-x-2 text-gray-500">
        <Button
          type="text"
          icon={<LeftOutlined />}
          className="flex items-center text-gray-700 hover:text-black"
          onClick={handleNavigateHome}
        />
        <span className="text-sm font-medium uppercase text-gray-400">
          TRANG CHỦ / VĂN PHÒNG CHO THUÊ / CHỌN ĐI XEM
        </span>
      </div>

      {/* Title */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-black">
          Danh sách tòa nhà đã lưu
        </h1>
        <p className="mt-2 text-base text-gray-500">
          Chưa có văn phòng nào được chọn, vui lòng chọn văn phòng để đi xem.
        </p>
      </div>

      {/* Empty Cart Button */}
      <div className="mt-8 flex justify-center">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="rounded-md bg-[#3162ad] px-6 py-4 text-lg font-semibold hover:bg-[#274b8d]"
          onClick={() => alert("Đi đến trang chọn tòa nhà")}
        >
          Chọn tòa nhà
        </Button>
      </div>
    </div>
  );
};

export default CartDetail;
