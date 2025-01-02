import {
  ClockCircleOutlined,
  DollarCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import React from "react";
import { FaRegStar, FaToggleOn } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { PiMoney } from "react-icons/pi";
import { TbLocation } from "react-icons/tb";

interface OfficeDetailsProps {
  details: {
    location: string;
    area: string;
    direction: string;
    grade: string;
    status: string;
    workingHours: string;
  };
  fees: {
    management: string;
    carParking: string;
    bikeParking: string;
    electricity: string;
    airConditioning: string;
    overtime: string;
    deposit: string;
    payment: string;
  };
  rentPrice: string;
}

const OfficeDetails: React.FC<OfficeDetailsProps> = ({
  details,
  fees,
  rentPrice,
}) => {
  return (
    <>
      <div className="mb-4 flex items-center">
        <PiMoney className="mr-3 text-xl font-bold text-red-500" size={38} />
        <h2 className="text-xl font-bold text-red-500">
          Giá thuê từ: {rentPrice}
        </h2>
      </div>

      <ul className="space-y-3 text-gray-700">
        <li className="flex items-center">
          <EnvironmentOutlined className="mr-3 text-lg text-[#3162ad]" />
          <span className="font-semibold">Vị trí</span>: {details.location}
        </li>
        <li className="flex items-center">
          <DollarCircleOutlined className="mr-3 text-lg text-[#3162ad]" />
          <span className="font-semibold">Diện tích</span>: {details.area}
        </li>
        <li className="flex items-center">
          <TbLocation className="mr-3 text-lg text-[#3162ad]" />
          <span className="font-semibold">Hướng</span>: {details.direction}
        </li>
        <li className="flex items-center">
          <FaRegStar className="mr-3 text-lg text-[#3162ad]" />
          <span className="font-semibold">Xếp Hạng</span>: {details.grade}
        </li>
        <li className="flex items-center">
          <FaToggleOn className="mr-3 text-lg text-[#3162ad]" />
          <span className="font-semibold">Tình trạng</span>: {details.status}
        </li>
        <li className="flex items-center">
          <ClockCircleOutlined className="mr-3 text-lg text-[#3162ad]" />
          <span className="font-semibold">Giờ làm việc</span>:{" "}
          {details.workingHours}
        </li>
      </ul>

      {/* Fees */}
      <div className="mt-6">
        <h3 className="mb-3 text-xl font-bold text-gray-900">Các loại phí</h3>
        <ul className="grid grid-cols-1 gap-2 space-y-3 text-gray-700 md:grid-cols-2">
          <li className="flex items-center">
            <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" />
            Phí quản lý: {fees.management}
          </li>
          <li className="flex items-center">
            <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" /> Phí ô tô:{" "}
            {fees.carParking}
          </li>
          <li className="flex items-center">
            <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" /> Phí xe
            máy: {fees.bikeParking}
          </li>
          <li className="flex items-center">
            <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" /> Tiền điện:{" "}
            {fees.electricity}
          </li>
          <li className="flex items-center">
            <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" /> Tiền điện
            lạnh: {fees.airConditioning}
          </li>
          <li className="flex items-center">
            <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" /> Phí ngoài
            giờ: {fees.overtime}
          </li>
          <li className="flex items-center">
            <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" /> Tiền đặt
            cọc: {fees.deposit}
          </li>
          <li className="flex items-center">
            <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" /> Thanh
            toán: {fees.payment}
          </li>
        </ul>
      </div>
    </>
  );
};

export default OfficeDetails;
