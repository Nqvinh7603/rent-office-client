import { DeleteOutlined } from "@ant-design/icons";
import { Button, DatePicker, Image, Input, Table } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../common/Breadcrums";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { removeBuilding } from "../../../redux/slices/appointmentSlice";

const CartDetail: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const buildings = useAppSelector((state) => state.appointment.buildings);

  const handleRemoveBuilding = (id: number) => {
    dispatch(removeBuilding(id));
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

      {buildings.length === 0 ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black">
            Danh sách tòa nhà đã lưu
          </h1>
          <p className="mt-2 text-base text-gray-500">
            Chưa có văn phòng nào được chọn, vui lòng chọn văn phòng để đi xem.
          </p>
        </div>
      ) : (
        <div>
          <h1 className="mb-6 text-2xl font-bold text-black">
            Danh sách tòa nhà đã lưu
          </h1>

          <Table
            dataSource={buildings.map((building) => ({
              key: building.buildingId,
              name: building.buildingName,
              buildingImage: building.buildingImages?.[0]?.imgUrl,
              address: `${building.buildingNumber} ${building.street}, ${building.ward}, ${building.district}, ${building.city}`,
              rentPrice: (() => {
                if (
                  !building?.buildingUnits ||
                  building.buildingUnits.length === 0
                ) {
                  return "Giá chưa cập nhật";
                }

                const latestPrices = building.buildingUnits
                  .map((unit) => {
                    if (
                      !unit?.rentalPricing ||
                      unit.rentalPricing.length === 0
                    ) {
                      return null;
                    }

                    const latestPricing = unit.rentalPricing.reduce(
                      (latest, pricing) => {
                        if (
                          !latest ||
                          new Date(pricing.createdAt) >
                            new Date(latest.createdAt)
                        ) {
                          return pricing;
                        }
                        return latest;
                      },
                      unit.rentalPricing[0],
                    );

                    return latestPricing ? latestPricing.price : null;
                  })
                  .filter((price) => price !== null);

                if (latestPrices.length === 0) {
                  return "Giá chưa cập nhật";
                }

                const minPrice = Math.min(...latestPrices);
                return `${minPrice.toLocaleString()} VND/m²`;
              })(),
            }))}
            columns={[
              {
                title: "Hình ảnh",
                dataIndex: "buildingImage",
                key: "buildingImage",
                render: (src) => (
                  <Image
                    src={src}
                    alt="Tòa nhà"
                    className="h-20 w-20 rounded-md object-cover"
                  />
                ),
                width: 100,
              },
              {
                title: "Tòa nhà",
                dataIndex: "name",
                key: "name",
                render: (name, record) => (
                  <div className="whitespace-normal">
                    <div className="font-bold text-[#3162ad]">{name}</div>
                    <div className="text-sm text-gray-500">
                      {record.address}
                    </div>
                    <div className="text-gray-700">{record.rentPrice}</div>
                  </div>
                ),
                width: 200,
              },
              {
                title: "Ngày giờ đi xem",
                dataIndex: "viewDate",
                key: "viewDate",
                render: () => (
                  <DatePicker showTime placeholder="Chọn ngày và giờ đi xem" />
                ),
                width: 150,
              },
              {
                title: "Diện tích",
                dataIndex: "area",
                key: "area",
                render: () => <Input placeholder="vd: 100m2, 200m2,..." />,
                width: 150,
              },
              {
                title: "",
                key: "action",
                render: (_, record) => (
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveBuilding(record.key)}
                  />
                ),
                width: 50,
              },
            ]}
            pagination={false}
            scroll={{ x: true }}
          />
        </div>
      )}
      {/* Form thông tin đi xem */}
      {buildings.length > 0 && (
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
