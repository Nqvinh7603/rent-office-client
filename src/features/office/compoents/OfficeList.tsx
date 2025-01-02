import {
  ArrowLeftOutlined,
  EnvironmentOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import { Button, Pagination } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const officeData = [
  {
    id: 1,
    name: "Opal Tower",
    price: "23$/m2",
    address: "Nguyễn Hữu Cảnh, Phường 22, Quận Bình Thạnh",
    sizes: "100, 300, 500, 700m²",
    direction: "Hướng Tây Nam",
    image: "/src/assets/image/building-1.jpg",
  },
  {
    id: 2,
    name: "Viettel Complex Building",
    price: "29$/m2",
    address: "Cách Mạng Tháng 8, Phường 12, Quận 10",
    sizes: "150, 300, 500, 700, 1000m²",
    direction: "Hướng Bắc",
    image: "/src/assets/image/building-2.jpg",
  },
];

const OfficeList: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Lọc dữ liệu theo trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = officeData.slice(startIndex, endIndex);

  // Xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    //window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 pb-10 pt-0">
      {/* Nút Quay Về Trang Chủ */}
      <div className="mb-6 flex items-center space-x-2 text-gray-500">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          className="flex items-center text-gray-700 hover:text-black"
          onClick={() => navigate("/")}
        />
        <span className="text-sm font-medium uppercase">
          <span
            className="cursor-pointer text-black hover:text-gray-700"
            onClick={() => navigate("/")}
          >
            TRANG CHỦ
          </span>{" "}
          / <span className="cursor-pointer hover:text-gray-700">TOÀ NHÀ</span>
        </span>
      </div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Các toà nhà</h1>

      {/* Danh sách các văn phòng */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {currentData.map((office) => (
          <div
            key={office.id}
            className="overflow-hidden rounded-lg bg-white shadow-lg"
          >
            <div className="relative">
              <img
                src={office.image}
                alt={office.name}
                className="h-48 w-full object-cover"
              />
              <div className="absolute left-2 top-2 rounded bg-[#3162ad] px-3 py-1 text-sm font-semibold text-white">
                {office.price}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-[#3162ad]">
                {office.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{office.address}</p>
              <div className="mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <EnvironmentOutlined />
                  {office.sizes}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <SelectOutlined />
                  {office.direction}
                </div>
              </div>
            </div>
            <div className="border-t p-4">
              <Button
                type="link"
                icon={<SelectOutlined />}
                className="font-semibold text-[#3162ad]"
              >
                Chọn đi xem
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination
          align="start"
          current={currentPage}
          total={10}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
          className="flex items-center justify-center gap-2 text-gray-500"
        />
      </div>
    </div>
  );
};

export default OfficeList;
