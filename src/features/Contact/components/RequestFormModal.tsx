import React from "react";
import { Modal, Form, Input, Button } from "antd";

interface RequestFormModalProps {
  visible: boolean;
  onClose: () => void;
}

const RequestFormModal: React.FC<RequestFormModalProps> = ({
  visible,
  onClose,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: {
    name: string;
    phone: string;
    demand?: string;
  }) => {
    console.log("Submitted Data:", values);
    onClose(); // Đóng Modal sau khi submit
    form.resetFields(); // Reset Form
  };

  return (
    <Modal
      title="Gửi yêu cầu thuê"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
      >
        <Form.Item
          name="name"
          label="Họ và tên"
          rules={[
            { required: true, message: "Họ và tên không được để trống!" },
          ]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Số điện thoại không được để trống!" },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item name="demand" label="Nhu cầu">
          <Input.TextArea placeholder="Nhập nhu cầu của bạn" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-[#3162ad]"
          >
            Đăng ký nhận tư vấn
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RequestFormModal;
