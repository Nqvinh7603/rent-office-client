import { Button, Form, Input, Rate } from "antd";
import React from "react";

const { TextArea } = Input;

const ReviewSection: React.FC = () => {
  const onFinish = (values: string) => {
    console.log("Form Submitted:", values);
  };

  return (
    <div>
      <Form
        name="reviewForm"
        onFinish={onFinish}
        className="mt-4"
        layout="vertical"
      >
        {/* Xếp hạng */}
        <Form.Item
          label={<span className="text-base font-medium">Xếp hạng:</span>}
          name="rating"
          rules={[{ required: true, message: "Hãy chọn xếp hạng!" }]}
        >
          <Rate />
        </Form.Item>

        {/* Họ Tên/Đơn Vị */}
        <Form.Item
          label={<span className="text-base font-medium">Họ Tên/Đơn Vị:</span>}
          name="name"
          rules={[
            { required: true, message: "Hãy nhập họ tên/đơn vị của bạn!" },
          ]}
        >
          <Input placeholder="Nhập họ tên hoặc tên đơn vị của bạn" />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label={<span className="text-base font-medium">Email:</span>}
          name="email"
          rules={[
            { required: true, message: "Hãy nhập email của bạn!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email của bạn" />
        </Form.Item>

        {/* Nội dung đánh giá */}
        <Form.Item
          label={
            <span className="text-base font-medium">Nội dung đánh giá:</span>
          }
          name="content"
          rules={[{ required: true, message: "Hãy nhập nội dung đánh giá!" }]}
        >
          <TextArea rows={5} placeholder="Nhập nội dung đánh giá của bạn" />
        </Form.Item>

        {/* Nút gửi */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="rounded px-5 py-2 text-white hover:bg-blue-600"
          >
            Đánh Giá
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ReviewSection;
