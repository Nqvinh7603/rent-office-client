import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Upload,
  UploadFile,
} from "antd";
import { UploadProps } from "antd/lib";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../common/Breadcrums";
import Loading from "../../../common/Loading";
import { FileType, ICustomer } from "../../../interfaces";
import {
  ConsignmentStatus,
  RequireType,
} from "../../../interfaces/common/enums";
import { buildingTypeService } from "../../../services/building/building-type-service";
import { customerService } from "../../../services/customer/customer-service";
import {
  formatCurrency,
  getBase64,
  parseCurrency,
  toSnakeCase,
} from "../../../utils";
import { useAddressOptions } from "../hooks";

const { TextArea } = Input;

export interface CreateCustomerFormValues extends ICustomer {
  consignmentImg: UploadFile[];
}

const DepositForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    addressOptions,
    districtOptions,
    wardOptions,
    selectedRegion,
    setSelectedRegion,
    selectedDistrict,
    setSelectedDistrict,
    selectedWard,
    setSelectedWard,
  } = useAddressOptions();

  const queryClient = useQueryClient();
  const [form] = Form.useForm<CreateCustomerFormValues>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const { mutate: createCustomer, isPending: isCreating } = useMutation({
    mutationFn: customerService.createCustomerWithConsignment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("customers"),
      });
    },
  });

  const handlePreview = useCallback(async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || file.preview || "");
    setPreviewOpen(true);
  }, []);

  const handleUploadChange: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList);
    form.setFieldsValue({ consignmentImg: fileList });
  };

  const { data: buildingTypesData, isLoading: isBuildingTypesLoading } =
    useQuery({
      queryKey: ["building-types"],
      queryFn: buildingTypeService.getAllBuildingTypes,
    });

  const buildingTypeOptions = buildingTypesData?.payload?.map((type) => ({
    label: type.buildingTypeName,
    value: type.buildingTypeName,
  }));

  const handleFinish = (values: CreateCustomerFormValues) => {
    const formData = new FormData();
    const consignments = [
      {
        ...values.consignments[0],
        consignmentImg: values.consignmentImg[0].name,
        status: ConsignmentStatus.PENDING,
        city:
          addressOptions.find(
            (item) => item.value === Number(values.consignments[0].city),
          )?.label || "",
      },
    ];

    const customerData: ICustomer = {
      ...values,
      requireType: RequireType.CONSIGNMENT,
      consignments,
    };

    formData.append("customer", JSON.stringify(toSnakeCase(customerData)));
    values.consignmentImg.forEach((file) => {
      formData.append("consignmentImg", file.originFileObj as File);
    });

    createCustomer(formData, {
      onSuccess: () => {
        toast.success("Ký gửi tài sản thành công");
        form.resetFields();
        setFileList([]);
      },
      onError: () => {
        toast.error("Ký gửi tài sản thất bại");
      },
    });
  };

  if (isBuildingTypesLoading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-2">
      <Breadcrumbs
        items={[
          { name: "TRANG CHỦ", path: "/" },
          { name: "KÝ GỬI VĂN PHÒNG", path: "" },
        ]}
        onBack={() => navigate("/")}
      />

      <div className="lg:flex lg:justify-between lg:gap-8">
        <div className="mb-6 lg:mb-0 lg:w-2/5">
          <img
            src="/src/assets/image/deposit.png"
            alt="House"
            className="mx-auto mb-4 h-auto w-64 lg:w-72"
          />
          <p className="text-sm leading-relaxed text-gray-700">
            Hợp tác với{" "}
            <strong className="font-semibold text-gray-800">
              CÔNG TY CỔ PHẦN BẤT ĐỘNG SẢN CYBER REAL
            </strong>{" "}
            ký gửi <strong>MIỄN PHÍ</strong> thông tin văn phòng cho thuê tại
            khu vực TP.HCM.
          </p>
          <h3 className="mt-4 text-sm font-bold text-gray-800">
            CAM KẾT CỦA CHÚNG TÔI
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
            <li>Đảm bảo những lợi ích của Quý đối tác cao nhất.</li>
            <li>
              Hình ảnh sản phẩm được xây dựng chuyên nghiệp và ấn tượng nhất có
              thể.
            </li>
            <li>
              Được tư vấn bởi các chuyên viên hàng đầu và am hiểu thị trường.
            </li>
            <li>Tiết kiệm thời gian, tối ưu hóa các quyền lợi.</li>
            <li>Bảo mật tuyệt đối các thông tin được cung cấp.</li>
          </ul>
        </div>

        <div className="rounded-md bg-white p-6 shadow-md lg:w-3/5">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Thông tin <span className="text-red-500">người ký gửi</span>
          </h2>
          <Form
            layout="vertical"
            form={form}
            onFinish={handleFinish}
            initialValues={{ active: true }}
          >
            <Form.Item
              label="Họ và tên"
              name="customerName"
              rules={[
                { required: true, message: "Họ và tên không được để trống!" },
              ]}
            >
              <Input placeholder="Nhập họ và tên" allowClear />
            </Form.Item>
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
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                { required: true, message: "Địa chỉ không được để trống!" },
              ]}
            >
              <Input.TextArea
                placeholder="Nhập địa chỉ (ví dụ: 123 Đường ABC, Phường XYZ, Quận 1, TP.HCM)"
                autoSize={{ minRows: 1, maxRows: 3 }}
                allowClear
              />
            </Form.Item>

            <h2 className="mb-4 mt-6 text-xl font-bold text-gray-800">
              Thông tin <span className="text-red-500">sản phẩm ký gửi</span>
            </h2>
            <Form.Item
              label="Loại tài sản"
              name={["consignments", "0", "buildingType"]}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại tài sản ký gửi!",
                },
              ]}
            >
              <Select
                placeholder="Chọn loại tài sản"
                options={buildingTypeOptions}
                allowClear
              />
            </Form.Item>
            <Form.Item
              label="Giá cho thuê"
              name={["consignments", "0", "price"]}
              rules={[
                {
                  required: true,
                  message: "Giá cho thuê không được để trống!",
                },
              ]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                formatter={(value) => formatCurrency(value)}
                parser={(value) => parseCurrency(value) as unknown as 0}
                addonAfter={
                  <span>
                    VND/m<sup>2</sup>/tháng
                  </span>
                }
              />
            </Form.Item>
            <div className="flex flex-wrap gap-4">
              <Form.Item
                label="Khu vực"
                name={["consignments", "0", "city"]}
                className="flex-1"
                rules={[
                  { required: true, message: "Khu vực không được để trống!" },
                ]}
              >
                <Select
                  allowClear
                  showSearch
                  value={selectedRegion}
                  placeholder="Chọn khu vực"
                  optionFilterProp="label"
                  options={addressOptions}
                  onChange={setSelectedRegion}
                  filterOption={(input, option) =>
                    option?.label.toLowerCase().includes(input.toLowerCase()) ??
                    false
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                />
              </Form.Item>
              <Form.Item
                label="Quận/Huyện"
                name={["consignments", "0", "district"]}
                className="flex-1"
                rules={[
                  {
                    required: true,
                    message: "Quận/Huyện không được để trống!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Chọn quận/huyện"
                  allowClear
                  value={selectedDistrict}
                  onChange={setSelectedDistrict}
                  filterOption={(input, option) =>
                    (option?.label
                      ?.toString()
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) ?? -1) >= 0
                  }
                >
                  {districtOptions.map((district) => (
                    <Select.Option key={district.value} value={district.label}>
                      {district.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Phường/Xã"
                name={["consignments", "0", "ward"]}
                className="flex-1"
                rules={[
                  { required: true, message: "Phường/Xã không được để trống!" },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Chọn phường/xã"
                  allowClear
                  value={selectedWard}
                  onChange={setSelectedWard}
                  filterOption={(input, option) =>
                    (option?.label
                      ?.toString()
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) ?? -1) >= 0
                  }
                >
                  {wardOptions.map((ward) => (
                    <Select.Option key={ward.value} value={ward.label}>
                      {ward.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <Form.Item
              label="Đường"
              name={["consignments", "0", "street"]}
              rules={[
                { required: true, message: "Đường không được để trống!" },
              ]}
            >
              <Input placeholder="Nhập đường" />
            </Form.Item>
            <Form.Item
              label="Nội dung"
              name={["consignments", "0", "description"]}
            >
              <TextArea
                placeholder="Mô tả thêm về sản phẩm ký gửi"
                rows={3}
                allowClear
              />
            </Form.Item>

            <Form.Item
              label="Tải hình ảnh"
              name="consignmentImg"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng tải lên ít nhất một hình ảnh!",
                },
              ]}
            >
              <Upload
                multiple
                listType="picture-card"
                fileList={fileList}
                beforeUpload={() => false}
                onPreview={handlePreview}
                onChange={handleUploadChange}
              >
                {fileList.length < 10 && (
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                  </button>
                )}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
              <small className="text-gray-500">
                Chọn tối đa 10 hình ảnh để gửi, bao gồm cả giấy tờ minh chứng
                liên quan.
              </small>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-[#3162ad] hover:bg-[#3162ad]"
                loading={isCreating}
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

export default DepositForm;
