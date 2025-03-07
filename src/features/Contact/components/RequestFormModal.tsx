import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Modal } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { ICustomer } from "../../../interfaces";
import {
  PotentialCustomer,
  RequireType,
} from "../../../interfaces/common/enums";
import { customerService } from "../../../services/customer/customer-service";

interface RequestFormModalProps {
  visible: boolean;
  onClose: () => void;
}

const RequestFormModal: React.FC<RequestFormModalProps> = ({
  visible,
  onClose,
}) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { mutate: createPotentialCustomer, isPending: isCreating } =
    useMutation({
      mutationFn: customerService.createPotentialCustomer,
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes("customers"),
        });
      },
    });

  function handleFinish(values: ICustomer) {
    const customerData = {
      ...values,
      status: PotentialCustomer.NOT_CONTACTED,
      requireType: RequireType.RENT,
    };
    createPotentialCustomer(customerData, {
      onSuccess: () => {
        toast.success("Gửi yêu cầu thành công");
        form.resetFields();
      },
      onError: () => {
        toast.error("Gửi yêu cầu thất bại");
      },
    });
  }

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
        initialValues={{ active: true }}
        onFinish={handleFinish}
        className="mt-4"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email không được để trống!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email" allowClear />
        </Form.Item>

        <Form.Item
          name="customerName"
          label="Họ và tên"
          rules={[
            { required: true, message: "Họ và tên không được để trống!" },
          ]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        <Form.Item
          label="Điện thoại"
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
          <Input placeholder="Nhập số điện thoại" allowClear />
        </Form.Item>

        <Form.Item name="note" label="Nhu cầu">
          <Input.TextArea
            placeholder="Nhập nhu cầu của bạn"
            rows={4}
            allowClear
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-[#3162ad]"
            loading={isCreating}
          >
            Đăng ký nhận tư vấn
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RequestFormModal;
