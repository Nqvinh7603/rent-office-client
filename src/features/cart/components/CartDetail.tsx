import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, DatePicker, Form, Image, Input, Table } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../common/Breadcrums";
import { ICustomerAppointment } from "../../../interfaces/appointment";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { removeBuilding } from "../../../redux/slices/appointmentSlice";
import { appointmentService } from "../../../services/appointment/appointment-service";

const CartDetail: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const buildings = useAppSelector((state) => state.appointment.buildings);

  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // State to track visit times and areas for each building
  const [visitTimes, setVisitTimes] = useState<Record<number, string | null>>(
    {},
  );
  const [areas, setAreas] = useState<Record<number, string>>({});

  const { mutate: createAppointment, isPending: isCreating } = useMutation({
    mutationFn: appointmentService.createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("appointments"),
      });
    },
  });

  const handleRemoveBuilding = (id: number) => {
    dispatch(removeBuilding(id));
    setVisitTimes((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    setAreas((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };
  const handleVisitTimeChange = (
    buildingId: number,
    date: dayjs.Dayjs | null,
  ) => {
    setVisitTimes((prev) => ({
      ...prev,
      [buildingId]: date ? date.format("YYYY-MM-DDTHH:mm:ss") : null,
    }));
  };

  const handleAreaChange = (buildingId: number, area: string) => {
    setAreas((prev) => ({
      ...prev,
      [buildingId]: area,
    }));
  };

  function handleFinish(values: ICustomerAppointment) {
    const customerData: ICustomerAppointment = {
      ...values,
      appointments: [
        {
          appointmentBuildings: buildings.map((building) => ({
            buildingId: building.buildingId,
            visitTime: visitTimes[building.buildingId] || "",
            area: areas[building.buildingId] || "",
          })),
        },
      ],
    };

    createAppointment(customerData, {
      onSuccess: () => {
        toast.success("Đặt lịch hẹn thành công");
        form.resetFields();
        setVisitTimes({});
        setAreas({});
        buildings.forEach((building) =>
          dispatch(removeBuilding(building.buildingId)),
        );
      },
      onError: () => {
        toast.error("Đặt lịch hẹn thất bại");
      },
    });
  }
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
              visitTime: visitTimes[building.buildingId] || null,
              area: areas[building.buildingId] || "",
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
                    <div className="text-xs text-gray-500">
                      {record.address}
                    </div>
                    <div className="text-gray-700">
                      Giá thuê: {record.rentPrice}
                    </div>
                  </div>
                ),
                width: 200,
              },
              {
                title: "Ngày giờ đi xem",
                dataIndex: "visitTime",
                key: "visitTime",
                render: (_, record) => (
                  <DatePicker
                    showTime
                    placeholder="Chọn ngày và giờ đi xem"
                    value={
                      visitTimes[record.key]
                        ? dayjs(visitTimes[record.key], "YYYY-MM-DDTHH:mm:ss")
                        : null
                    }
                    onChange={(date) => handleVisitTimeChange(record.key, date)}
                    style={{ width: "100%" }}
                  />
                ),
                width: 200,
              },
              {
                title: "Diện tích",
                dataIndex: "area",
                key: "area",
                render: (_, record) => (
                  <Input
                    placeholder="Nhập diện tích (vd: 100m²)"
                    value={areas[record.key] || ""}
                    onChange={(e) =>
                      handleAreaChange(record.key, e.target.value)
                    }
                  />
                ),
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
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Form.Item
                name="customerName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ và tên / tên công ty",
                  },
                ]}
              >
                <Input placeholder="Họ và Tên / Tên công ty" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Số điện thoại không được để trống!",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]}
              >
                <Input placeholder="Số điện thoại" />
              </Form.Item>
            </div>
            <div className="mt-4">
              <Form.Item name="note">
                <Input.TextArea rows={4} placeholder="Ghi chú" />
              </Form.Item>
            </div>
            <div className="mt-4">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-[#3162ad] text-white hover:bg-[#274b8d]"
                  loading={isCreating}
                >
                  Đặt lịch hẹn đi xem
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default CartDetail;
