import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const ContactForm: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Nút Quay Về Trang Chủ */}
      <div className="mb-6 flex items-center space-x-2 text-gray-500">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          className="flex items-center text-gray-700 hover:text-black"
          onClick={() => navigate("/")}
        />
        <span className="text-sm font-medium uppercase">
          TRANG CHỦ / LIÊN HỆ
        </span>
      </div>
      <div className="lg:flex lg:justify-between lg:gap-10">
        <div className="mb-6 space-y-4 text-gray-700 lg:mb-0 lg:w-2/5">
          <h1 className="text-3xl font-bold text-black">
            Liên hệ ngay với chúng tôi.
          </h1>
          <p className="font-semibold text-gray-800">
            CÔNG TY CỔ PHẦN BẤT ĐỘNG SẢN CYBER REAL
          </p>
          <p className="text-sm leading-relaxed">
            Địa chỉ: L18-11-13, Tầng 18, Vincom Center Đồng Khởi, 72 Lê Thánh
            Tôn, Phường Bến Nghé, Quận 1, Tp HCM
          </p>
          <p className="text-sm leading-relaxed">
            Điện thoại: <span className="font-semibold">0919 463 436</span>
          </p>
          <p className="text-sm">
            Email:{" "}
            <a
              href="mailto:info@cyberreal.vn"
              className="text-blue-500 hover:underline"
            >
              info@cyberreal.vn
            </a>
          </p>
          <p className="text-sm">
            Website:{" "}
            <a
              href="https://cyberreal.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              https://cyberreal.vn
            </a>
          </p>
        </div>

        {/* Form Liên Hệ */}
        <div className="rounded-md bg-white p-6 shadow-md lg:w-3/5">
          <Form layout="vertical" className="space-y-4">
            <Form.Item
              label="Họ tên"
              name="fullName"
              rules={[
                { required: true, message: "Họ tên không được để trống." },
              ]}
            >
              <Input placeholder="Nhập họ tên" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email không được để trống." },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
            <Form.Item label="Điện thoại" name="phone">
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item label="Lời nhắn" name="message">
              <TextArea placeholder="Nhập lời nhắn" rows={4} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-[#3162ad] text-white hover:bg-[#27487d]"
              >
                Gửi đi
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
