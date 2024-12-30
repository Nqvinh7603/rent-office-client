import React from "react";
import { Button } from "antd";
import { EnvironmentOutlined, SelectOutlined } from "@ant-design/icons";

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
  {
    id: 3,
    name: "Pearl 5 Building",
    price: "35$/m2",
    address: "Lê Quý Đôn, Phường Võ Thị Sáu, Quận 3",
    sizes: "100, 200, 400, 700m²",
    direction: "Hướng Đông",
    image: "/src/assets/image/building-3.jpg",
  },
  {
    id: 4,
    name: "Centec Tower",
    price: "36$/m2",
    address: "Nguyễn Thị Minh Khai, Phường Võ Thị Sáu, Quận 3",
    sizes: "150, 250, 350, 500, 700m²",
    direction: "Hướng Đông Nam",
    image: "/src/assets/image/building-4.jpg",
  },
];

const OfficeList: React.FC = () => {
  return (
    <div className="mx-auto my-8 w-11/12 lg:w-3/4">
      <h2 className="mb-8 text-2xl font-bold text-[#3162ad]">
        Văn Phòng Hạng A
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {officeData.map((office) => (
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
    </div>
  );
};

export default OfficeList;
