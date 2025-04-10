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
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../common/Breadcrums";
import Loading from "../../../common/Loading";
import { FileType, ICustomer } from "../../../interfaces";
import { ORENTATION_TRANSLATIONS } from "../../../interfaces/common/constants";
import {
  ConsignmentStatus,
  RequireType,
} from "../../../interfaces/common/enums";
import { buildingTypeService } from "../../../services/building/building-type-service";
import { feeTypeService } from "../../../services/building/fee-type-service";
import { customerService } from "../../../services/consignment/consignment-service";
import {
  formatCurrency,
  getBase64,
  parseCurrency,
  toSnakeCase,
} from "../../../utils";
import { useAddressOptions } from "../hooks";

export interface CreateCustomerFormValues extends ICustomer {
  buildingImg: UploadFile[];
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
        predicate: (query) => query.queryKey.includes("buildings"),
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
    form.setFieldsValue({ buildingImg: fileList });
  };

  const { data: buildingTypesData, isLoading: isBuildingTypesLoading } =
    useQuery({
      queryKey: ["building-types"],
      queryFn: buildingTypeService.getAllBuildingTypes,
    });

  const { data: feeTypesData, isLoading: isFeeTypesLoading } = useQuery({
    queryKey: ["fee-types"],
    queryFn: feeTypeService.getAllFeeTypes,
  });

  const feeTypeOptions =
    feeTypesData?.payload?.map((type) => ({
      label: type.feeTypeName,
      value: type.feeTypeId,
    })) || [];

  const buildingTypeOptions =
    buildingTypesData?.payload?.map((type) => ({
      label: type.buildingTypeName,
      value: type.buildingTypeId,
    })) || [];

  const handleFinish = (values: CreateCustomerFormValues) => {
    const formData = new FormData();
    const buildings = [
      {
        ...values.buildings[0],
        buildingImg: values.buildingImg[0].name,
        city:
          addressOptions.find(
            (item) => item.value === Number(values.buildings[0].city),
          )?.label || "",
        consignmentStatusHistories: [
          {
            status: ConsignmentStatus.PENDING,
          },
        ],
        buildingUnits: values.buildings[0].buildingUnits.map((unit) => ({
          buildingUnitId: unit.buildingUnitId,
          unitName: unit.unitName,
          floor: unit.floor,
          rentalPricing: unit.rentalPricing, // Provide a default or actual value
          rentAreas: unit.rentAreas, // Provide a default or actual value
          createdAt: unit.createdAt, // Provide a default or actual value
        })),
      },
    ];

    const customerData: ICustomer = {
      ...values,
      requireType: RequireType.CONSIGNMENT,
      buildings,
    };

    formData.append("customer", JSON.stringify(toSnakeCase(customerData)));
    values.buildingImg.forEach((file) => {
      formData.append("buildingImg", file.originFileObj as File);
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
      <div className="mb-6 text-center lg:mb-0">
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
          ký gửi <strong>MIỄN PHÍ</strong> thông tin văn phòng cho thuê tại khu
          vực TP.HCM.
        </p>
        <h3 className="mt-4 text-sm font-bold text-gray-800">
          CAM KẾT CỦA CHÚNG TÔI
        </h3>
        <ul className="mt-2 inline-block list-disc space-y-1 pl-5 text-left text-sm text-gray-600">
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

      <div className="mt-5 flex justify-center">
        <div className="w-full max-w-full rounded-md bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Thông tin <span className="text-red-500">người ký gửi</span>
          </h2>
          <Form
            layout="vertical"
            form={form}
            onFinish={handleFinish}
            initialValues={{ active: true }}
          >
            <div className="flex flex-wrap gap-4">
              <Form.Item
                label="Họ và tên"
                name="customerName"
                rules={[
                  { required: true, message: "Họ và tên không được để trống!" },
                ]}
                className="flex-1"
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
                className="flex-1"
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
                className="flex-1"
              >
                <Input placeholder="Nhập số điện thoại" allowClear />
              </Form.Item>
            </div>
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
            <div className="flex flex-wrap gap-4">
              <Form.Item
                label="Tên tài sản"
                name={["buildings", "0", "buildingName"]}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn loại tài sản ký gửi!",
                  },
                ]}
                className="flex-1"
              >
                <Input placeholder="Nhập tên tài sản" allowClear />
              </Form.Item>
              <Form.Item
                label="Loại tài sản"
                name={["buildings", "0", "buildingType", "buildingTypeId"]}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn loại tài sản ký gửi!",
                  },
                ]}
                className="flex-1"
              >
                <Select
                  placeholder="Chọn loại tài sản"
                  options={buildingTypeOptions}
                  allowClear
                />
              </Form.Item>
              {/* <Form.Item
                label="Giá cho thuê"
                name={["buildings", "0", "rentalPricing", 0, "price"]}
                rules={[
                  {
                    required: true,
                    message: "Giá cho thuê không được để trống!",
                  },
                ]}
                className="flex-1"
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
              </Form.Item> */}
            </div>
            <div className="flex flex-wrap gap-4">
              <Form.Item
                label="Khu vực"
                name={["buildings", "0", "city"]}
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
                name={["buildings", "0", "district"]}
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
                  optionFilterProp="label"
                  filterOption={(input, option) =>
                    (String(option?.children) ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
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
                name={["buildings", "0", "ward"]}
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
                  optionFilterProp="label"
                  filterOption={(input, option) =>
                    (String(option?.children) ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
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
            <div className="flex flex-wrap gap-4">
              <Form.Item
                className="flex-1"
                label="Tên đường"
                name={["buildings", "0", "street"]}
                rules={[
                  { required: true, message: "Đường không được để trống!" },
                ]}
              >
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>
              <Form.Item
                className="flex-2"
                label="Số nhà"
                name={["buildings", "0", "buildingNumber"]}
                rules={[
                  { required: true, message: "Số nhà không được để trống!" },
                ]}
              >
                <Input placeholder="Nhập số nhà" />
              </Form.Item>
            </div>
            <div className="flex flex-wrap gap-4">
              <Form.Item
                label="Hướng"
                name={["buildings", "0", "orientation"]}
                rules={[
                  { required: true, message: "Hướng không được để trống!" },
                ]}
                className="flex-1"
              >
                <Select
                  placeholder="Chọn hướng"
                  allowClear
                  showSearch
                  options={Object.entries(ORENTATION_TRANSLATIONS).map(
                    ([value, label]) => ({
                      label,
                      value,
                    }),
                  )}
                  filterOption={(input, option) =>
                    option?.label.toLowerCase().includes(input.toLowerCase()) ??
                    false
                  }
                />
              </Form.Item>
              <Form.Item
                label="Tổng số tầng"
                name={["buildings", "0", "numberOfFloors"]}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số tầng!",
                  },
                ]}
                className="flex-1"
              >
                <InputNumber
                  min={1}
                  style={{ width: "100%" }}
                  addonAfter="tầng"
                />
              </Form.Item>
              <Form.Item
                label="Tổng diện tích sàn"
                name={["buildings", "0", "totalArea"]}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập diện tích!",
                  },
                ]}
                className="flex-1"
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  addonAfter="m²"
                />
              </Form.Item>
            </div>

            <Form.Item label="Danh sách đơn vị tài sản">
              <div className="rounded-md border p-4">
                <Form.List name={["buildings", 0, "buildingUnits"]}>
                  {(fields, { add, remove }) => (
                    <div>
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} className="mb-2 flex flex-wrap gap-4">
                          <Form.Item
                            {...restField}
                            name={[name, "unitName"]}
                            label="Tên đơn vị"
                            rules={[
                              { required: true, message: "Nhập tên đơn vị!" },
                            ]}
                            className="flex-1"
                          >
                            <Input placeholder="Nhập tên đơn vị" allowClear />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, "floor"]}
                            label="Tầng"
                            rules={[
                              { required: true, message: "Nhập số tầng!" },
                            ]}
                            className="flex-1"
                          >
                            <InputNumber
                              min={1}
                              style={{ width: "100%" }}
                              placeholder="Nhập số tầng"
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, "rentalPricing", 0, "price"]}
                            label="Giá cho thuê"
                            rules={[
                              {
                                required: true,
                                message: "Giá cho thuê không được để trống!",
                              },
                            ]}
                            className="flex-1"
                          >
                            <InputNumber
                              min={0}
                              style={{ width: "100%" }}
                              formatter={(value) => formatCurrency(value)}
                              parser={(value) =>
                                parseCurrency(value) as unknown as 0
                              }
                              addonAfter={
                                <span>
                                  VND/m<sup>2</sup>/tháng
                                </span>
                              }
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, "rentAreas"]}
                            label="Diện tích cho thuê"
                            className="flex-1"
                          >
                            <Form.List name={[name, "rentAreas"]}>
                              {(
                                areaFields,
                                { add: addArea, remove: removeArea },
                              ) => (
                                <div>
                                  {areaFields.map(
                                    ({
                                      key: areaKey,
                                      name: areaName,
                                      ...areaRestField
                                    }) => (
                                      <div
                                        key={areaKey}
                                        className="mb-2 flex items-center gap-4"
                                      >
                                        <Form.Item
                                          {...areaRestField}
                                          name={[areaName, "area"]}
                                          rules={[
                                            {
                                              required: true,
                                              message: "Nhập diện tích!",
                                            },
                                          ]}
                                          className="flex-1"
                                        >
                                          <InputNumber
                                            min={0}
                                            style={{ width: "100%" }}
                                            placeholder="Nhập diện tích"
                                            addonAfter="m²"
                                          />
                                        </Form.Item>
                                        <Button
                                          type="link"
                                          onClick={() => removeArea(areaName)}
                                          className="items-center text-red-500"
                                          icon={
                                            <PlusOutlined
                                              rotate={45}
                                              className="mb-5"
                                            />
                                          }
                                        />
                                      </div>
                                    ),
                                  )}
                                  <Button
                                    type="primary"
                                    htmlType="button"
                                    onClick={() => addArea()}
                                    block
                                  >
                                    + Thêm diện tích
                                  </Button>
                                </div>
                              )}
                            </Form.List>
                          </Form.Item>

                          <Button
                            type="link"
                            onClick={() => remove(name)}
                            className="items-center text-red-500"
                            icon={<PlusOutlined rotate={45} className="mb-5" />}
                          />
                        </div>
                      ))}
                      <Button
                        type="primary"
                        htmlType="button"
                        className="w-full bg-[#3162ad] hover:bg-[#3162ad]"
                        onClick={() => add()}
                        block
                      >
                        + Thêm đơn vị tài sản
                      </Button>
                    </div>
                  )}
                </Form.List>
              </div>
            </Form.Item>

            <Form.Item label="Các loại phí">
              <div className="rounded-md border p-4">
                <Form.List name={["buildings", "0", "fees"]}>
                  {(fields, { add, remove }) => (
                    <div>
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} className="mb-2 flex items-center gap-4">
                          <Form.Item
                            {...restField}
                            name={[name, "feeType", "feeTypeId"]}
                            rules={[
                              { required: true, message: "Chọn loại phí" },
                            ]}
                            className="flex-1"
                          >
                            <Select
                              placeholder="Chọn loại phí"
                              options={feeTypeOptions}
                              allowClear
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, "feePricing", 0, "priceValue"]}
                            className="flex-1"
                          >
                            <InputNumber
                              min={0}
                              style={{ width: "100%" }}
                              formatter={(value) => formatCurrency(value)}
                              parser={(value) =>
                                parseCurrency(value) as unknown as 0
                              }
                              addonAfter={
                                <Form.Item
                                  {...restField}
                                  name={[name, "feePricing", 0, "priceUnit"]}
                                  noStyle
                                >
                                  <Select
                                    placeholder="Chọn đơn vị"
                                    options={[
                                      {
                                        value: "VND/m²/tháng",
                                        label: "VND/m²/tháng",
                                      }, // Phí quản lý

                                      {
                                        value: "VND/xe/tháng",
                                        label: "VND/xe/tháng",
                                      }, // Phí đỗ xe

                                      {
                                        value: "VND/tháng",
                                        label: "VND/tháng",
                                      }, // Các phí cố định
                                      { value: "VND/quý", label: "VND/quý" },
                                      { value: "VND/năm", label: "VND/năm" },
                                      { value: "VND/lần", label: "VND/lần" }, // Phí vệ sinh, bảo trì
                                    ]}
                                  />
                                </Form.Item>
                              }
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, "feePricing", 0, "description"]}
                            className="flex-1"
                          >
                            <Input.TextArea
                              placeholder="Nhập mô tả (nếu có)"
                              autoSize={{ minRows: 1, maxRows: 3 }}
                              allowClear
                            />
                          </Form.Item>

                          <Button
                            type="link"
                            onClick={() => remove(name)}
                            className="items-center text-red-500"
                            icon={<PlusOutlined rotate={45} className="mb-5" />}
                          />
                        </div>
                      ))}
                      <Button
                        type="primary"
                        htmlType="button"
                        className="w-full bg-[#3162ad] hover:bg-[#3162ad]"
                        onClick={() => add()}
                        block
                      >
                        + Thêm phí
                      </Button>
                    </div>
                  )}
                </Form.List>
              </div>
            </Form.Item>
            <div className="flex flex-wrap gap-4">
              <Form.Item
                label="Chu kỳ thanh toán"
                name={["buildings", "0", "paymentPolicies", 0, "paymentCycle"]}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập chu kỳ thanh toán!",
                  },
                ]}
                className="flex-1"
              >
                <Input placeholder="Nhập chu kỳ thanh toán" allowClear />
              </Form.Item>
              <Form.Item
                label="Thời gian đặt cọc"
                name={["buildings", "0", "paymentPolicies", 0, "depositTerm"]}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập thời gian đặt cọc!",
                  },
                ]}
                className="flex-1"
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  addonAfter="tháng"
                />
              </Form.Item>
            </div>
            <Form.Item
              label="Nội dung"
              name={["buildings", "0", "description"]}
            >
              <JoditEditor
                value={form.getFieldValue(["buildings", 0, "description"])}
                onChange={(value) => {
                  const buildings = form.getFieldValue("buildings") || [];
                  buildings[0] = { ...buildings[0], description: value };
                  form.setFieldsValue({ buildings });
                }}
              />
            </Form.Item>

            <Form.Item
              label="Tải hình ảnh"
              name="buildingImg"
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
