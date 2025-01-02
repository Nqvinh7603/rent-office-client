import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { GrContact } from "react-icons/gr";
import { LiaBusinessTimeSolid } from "react-icons/lia";

const ActionBtn: React.FC = () => {
  const [isConsultationModalVisible, setIsConsultationModalVisible] =
    useState(false);
  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);

  const showConsultationModal = () => setIsConsultationModalVisible(true);
  const closeConsultationModal = () => setIsConsultationModalVisible(false);

  const showScheduleModal = () => setIsScheduleModalVisible(true);
  const closeScheduleModal = () => setIsScheduleModalVisible(false);

  interface FormValues {
    name: string;
    phone: string;
    requirement: string;
  }

  const handleConsultationSubmit = (values: FormValues) => {
    console.log("Form submitted:", values);
    setIsConsultationModalVisible(false);
  };

  return (
    <>
      <div className="mt-12 flex space-x-4">
        <Button
          type="primary"
          className="flex items-center justify-center space-x-2 rounded-lg bg-[#3162ad] px-10 py-5 text-base font-semibold text-white hover:bg-blue-700"
          onClick={showScheduleModal}
        >
          <LiaBusinessTimeSolid size={28} />
          <span>Hẹn đi xem</span>
        </Button>

        <Button
          type="default"
          className="flex items-center justify-center space-x-2 rounded-lg border-2 border-[#3162ad] px-10 py-5 text-base font-semibold text-[#3162ad] hover:border-blue-700 hover:text-blue-700"
          onClick={showConsultationModal}
        >
          <GrContact size={28} />
          <span>Tư vấn nhanh</span>
        </Button>
      </div>

      <Modal
        title="Đăng ký nhận tư vấn"
        open={isConsultationModalVisible}
        onCancel={closeConsultationModal}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleConsultationSubmit}>
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              { pattern: /^[0-9]+$/, message: "Số điện thoại không hợp lệ" },
            ]}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item
            name="requirement"
            label="Nhu cầu"
            rules={[{ required: true, message: "Vui lòng nhập nhu cầu" }]}
          >
            <Input.TextArea rows={4} placeholder="Nhập nhu cầu của bạn" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-[#3162ad] text-white"
            >
              Đăng ký nhận tư vấn
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={null}
        open={isScheduleModalVisible}
        onCancel={closeScheduleModal}
        footer={[
          <Button
            key="view-list"
            type="primary"
            className="mx-auto bg-[#3162ad] text-white"
            onClick={() => (window.location.href = "/chon-di-xem")}
          >
            Xem danh sách
          </Button>,
        ]}
        width={600}
      >
        <div className="text-center text-lg font-medium text-gray-700">
          Tòa nhà văn phòng đã được lưu vào danh sách hẹn đi xem thành công.
        </div>
      </Modal>
    </>
  );
};

export default ActionBtn;
