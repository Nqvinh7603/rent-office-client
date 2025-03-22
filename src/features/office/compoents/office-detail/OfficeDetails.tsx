import { DollarCircleOutlined } from "@ant-design/icons";
import React from "react";
import { FaRegStar } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { PiMoney } from "react-icons/pi";
import { TbLocation } from "react-icons/tb";

interface OfficeDetailsProps {
  details: {
    location: string;
    area: string;
    direction: string;
    grade: string;
  };
  fees: {
    label: string;
    value: string;
  }[];
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

      <ul className="space-y-5 text-gray-700">
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
      </ul>

      {/* Fees */}
      <div className="mt-6">
        <h3 className="mb-3 text-xl font-bold text-gray-900">Các loại phí</h3>
        <ul className="grid grid-cols-1 gap-2 space-y-3 text-gray-700 md:grid-cols-2">
          {fees.map((fee, index) => (
            <li key={index} className="flex items-center text-sm">
              <IoMdPricetags
                className="mr-2 text-base text-[#3162ad]"
                size={20}
              />
              {fee.label}: {fee.value}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default OfficeDetails;
