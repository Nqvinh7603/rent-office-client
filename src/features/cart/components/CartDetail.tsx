import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Table } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../common/Breadcrums";

interface Building {
  id: number;
  name: string;
  address: string;
  rentPrice: string;
  image: string;
}

const CartDetail: React.FC = () => {
  const navigate = useNavigate();

  // Mock dữ liệu danh sách tòa nhà đã lưu
  const savedBuildings: Building[] = [
    {
      id: 1,
      name: "The Nexus Tower",
      address: "Tôn Đức Thắng, Phường Bến Nghé, Quận 1",
      rentPrice: "53$/m2",
      image: "/src/assets/image/building-nexus.jpg",
    },
    // Thêm dữ liệu khác ở đây
  ];

  const handleNavigateBuildings = () => {
    navigate("/van-phong");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Xử lý xóa một tòa nhà khỏi danh sách
  const handleRemoveBuilding = (id: number) => {
    console.log(`Remove building with ID: ${id}`);
    // Thêm logic để xóa tòa nhà tại đây
  };

  return (
    <div className="mx-auto my-8 max-w-7xl px-4 lg:px-8">
      <Breadcrumbs
        items={[
          { name: "TRANG CHỦ", path: "/" },
          { name: "THUÊ TÒA NHÀ", path: "" },
        ]}
        onBack={() => navigate("/")}
      />

      {savedBuildings.length === 0 ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black">
            Danh sách tòa nhà đã lưu
          </h1>
          <p className="mt-2 text-base text-gray-500">
            Chưa có văn phòng nào được chọn, vui lòng chọn văn phòng để đi xem.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="rounded-md bg-[#3162ad] px-6 py-4 text-lg font-semibold hover:bg-[#274b8d]"
              onClick={handleNavigateBuildings}
            >
              Chọn tòa nhà
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="mb-6 text-2xl font-bold text-black">
            Danh sách tòa nhà đã lưu
          </h1>

          <Table
            dataSource={savedBuildings}
            rowKey="id"
            columns={[
              {
                title: "Hình ảnh",
                dataIndex: "image",
                key: "image",
                render: (src) => (
                  <img
                    src={src}
                    alt="Tòa nhà"
                    className="h-16 w-16 rounded-md object-cover"
                  />
                ),
              },
              {
                title: "Tòa nhà",
                dataIndex: "name",
                key: "name",
                render: (name, record) => (
                  <div>
                    <div className="font-bold text-[#3162ad]">{name}</div>
                    <div className="text-gray-500">{record.address}</div>
                    <div className="text-gray-700">{record.rentPrice}</div>
                  </div>
                ),
              },
              {
                title: "Ngày giờ đi xem",
                dataIndex: "viewDate",
                key: "viewDate",
                render: () => (
                  <DatePicker showTime placeholder="Chọn ngày và giờ đi xem" />
                ),
              },
              {
                title: "Diện tích",
                dataIndex: "area",
                key: "area",
                render: () => <Input placeholder="vd: 100m2, 200m2,..." />,
              },
              {
                title: "",
                key: "action",
                render: (_, record) => (
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveBuilding(record.id)}
                  />
                ),
              },
            ]}
            pagination={false}
          />
        </div>
      )}

      {/* Form thông tin đi xem */}
      {savedBuildings.length > 0 && (
        <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-lg font-bold text-black">
            Thông tin đi xem
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input placeholder="Họ và Tên / Tên công ty" />
            <Input placeholder="Email" />
            <Input placeholder="Số điện thoại" />
          </div>
          <div className="mt-4">
            <Input.TextArea rows={4} placeholder="Ghi chú" />
          </div>
          <div className="mt-4">
            {/* reCAPTCHA có thể được tích hợp tại đây */}
            <Button
              type="primary"
              className="w-full bg-[#3162ad] text-white hover:bg-[#274b8d]"
            >
              Đặt lịch hẹn đi xem
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDetail;
