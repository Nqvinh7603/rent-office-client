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
import JoditEditor from "jodit-react";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../common/Loading";
import { FileType } from "../../../interfaces";
import { ConsignmentStatus } from "../../../interfaces/common/enums";
import { IConsignmentUpdate } from "../../../interfaces/consignment";
import { buildingTypeService } from "../../../services/building/building-type-service";
import { customerService } from "../../../services/consignment/consignment-service";
import {
  formatCurrency,
  getBase64,
  parseCurrency,
  toSnakeCase,
} from "../../../utils";
import { useAddressOptions } from "../hooks";

export interface CreateCustomerFormValues extends IConsignmentUpdate {
  consignmentImg: UploadFile[];
}

const UpdateDepositForm: React.FC = () => {
  const navigate = useNavigate();
  const { consignmentId } = useParams<{ consignmentId: string }>();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

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
  const [additionalInfo, setAdditionalInfo] = useState<string>("");

  useEffect(() => {
    if (!token) {
      toast.error("Token không hợp lệ");
      navigate("/login");
    }
  }, [token, navigate]);

  const { isLoading: isVerifyingToken, isError: isTokenInvalid } = useQuery({
    queryKey: ["verifyToken", consignmentId, token],
    queryFn: async () => {
      if (!token) throw new Error("Token không hợp lệ");
      return customerService.verifyToken(consignmentId!, token);
    },
    enabled: !!token,
  });

  useEffect(() => {
    if (isTokenInvalid) {
      toast.error("Token không hợp lệ");
      navigate("/login");
    }
  }, [isTokenInvalid, navigate]);

  const { data, isLoading: isFetchingConsignment } = useQuery({
    queryFn: () => customerService.getConsignmentById(Number(consignmentId)),
    queryKey: ["consignments", consignmentId],
    enabled: !isTokenInvalid,
  });

  const consignment = data?.payload;

  useEffect(() => {
    if (consignment) {
      form.setFieldsValue({
        ...consignment,
        consignmentImg: consignment.consignmentImages.map((image, index) => ({
          uid: `${index}`,
          name: image.imgUrl || `image-${index}`,
          status: "done",
          url: image.imgUrl,
        })),
      });
      setAdditionalInfo(consignment.additionalInfo || "");
      setFileList(
        consignment.consignmentImages.map((image, index) => ({
          uid: `${index}`,
          name: image.imgUrl || `image-${index}`,
          status: "done",
          url: image.imgUrl,
        })),
      );
    }
  }, [consignment, form]);

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

  const { mutate: updateCustomer, isPending: isUpdating } = useMutation({
    mutationFn: ({
      consignmentId,
      updatedConsignment,
    }: {
      consignmentId: string;
      updatedConsignment: FormData;
    }) => {
      return customerService.update(consignmentId, updatedConsignment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("consignments");
        },
      });
    },
  });

  function handleFinish(values: IConsignmentUpdate) {
    if (consignment) {
      const formData = new FormData();
      const consignments = {
        ...consignment,
        ...values,
        status: ConsignmentStatus.ADDITIONAL_INFO,
      };

      formData.append("customer", JSON.stringify(toSnakeCase(consignments)));

      updateCustomer(
        {
          consignmentId: consignment.consignmentId.toString(),
          updatedConsignment: formData,
        },
        {
          onSuccess: () => {
            toast.success("Cập nhật tài sản thành công");
          },
          onError: () => {
            toast.error("Cập nhật tài sản thất bại");
          },
        },
      );
    }
  }

  if (isVerifyingToken || isFetchingConsignment || isBuildingTypesLoading) {
    return <Loading />;
  }

  if (isTokenInvalid || !consignmentId) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="lg:flex lg:justify-between lg:gap-8">
        <div className="mb-6 lg:mb-0 lg:w-2/5">
          <div className="rounded-md bg-white p-6 shadow-md">
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Nội dung cần bổ sung
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              <div dangerouslySetInnerHTML={{ __html: additionalInfo }} />
            </p>
          </div>
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
              name={["customer", "customerName"]}
              rules={[
                { required: true, message: "Họ và tên không được để trống!" },
              ]}
            >
              <Input placeholder="Nhập họ và tên" allowClear />
            </Form.Item>
            <Form.Item
              label="Email"
              name={["customer", "email"]}
              rules={[
                { required: true, message: "Email không được để trống!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input placeholder="Nhập email" allowClear />
            </Form.Item>
            <Form.Item
              label="Điện thoại"
              name={["customer", "phoneNumber"]}
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
              name={["customer", "address"]}
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
              name="buildingType"
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
              name="price"
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
                name="city"
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
                name="district"
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
                name="ward"
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
              name="street"
              rules={[
                { required: true, message: "Đường không được để trống!" },
              ]}
            >
              <Input placeholder="Nhập đường" />
            </Form.Item>
            <Form.Item label="Nội dung" name="description">
              <JoditEditor
                value={form.getFieldValue("description")}
                onChange={(value) => {
                  form.setFieldsValue({ description: value });
                }}
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
                loading={isUpdating}
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

export default UpdateDepositForm;
