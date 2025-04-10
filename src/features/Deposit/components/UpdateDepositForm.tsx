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
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../common/Loading";
import { FileType } from "../../../interfaces";
import { ORENTATION_TRANSLATIONS } from "../../../interfaces/common/constants";
import { ConsignmentStatus } from "../../../interfaces/common/enums";
import { IConsignmentUpdate } from "../../../interfaces/consignment";
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

export interface CreateCustomerFormValues extends IConsignmentUpdate {
  buildingImg: UploadFile[];
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
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    if (!token) {
      toast.error("Token không hợp lệ");
      navigate("/");
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
      navigate("/");
    }
  }, [isTokenInvalid, navigate]);

  const { data: feeTypesData, isLoading: isFeeTypesLoading } = useQuery({
    queryKey: ["fee-types"],
    queryFn: feeTypeService.getAllFeeTypes,
  });

  const feeTypeOptions =
    feeTypesData?.payload?.map((type) => ({
      label: type.feeTypeName,
      value: type.feeTypeId,
    })) || [];

  const { data, isLoading: isFetchingConsignment } = useQuery({
    queryFn: () => customerService.getConsignmentById(Number(consignmentId)),
    queryKey: ["buildings", consignmentId],
    enabled: !isTokenInvalid,
  });

  const consignment = data?.payload;

  useEffect(() => {
    if (consignment) {
      form.setFieldsValue({
        ...consignment,
        buildingImg: consignment.buildingImages.map((image, index) => ({
          uid: `${index}`,
          name: image.imgUrl || `image-${index}`,
          status: "done",
          url: image.imgUrl,
        })),
      });
      setPreviewImage(consignment.buildingImages[0]?.imgUrl || "");
      setNote(
        consignment.consignmentStatusHistories[
          consignment.consignmentStatusHistories.length - 1
        ]?.note || "",
      );
      setFileList(
        consignment.buildingImages.map((image, index) => ({
          uid: `${index}`,
          name: image.imgUrl || `image-${index}`,
          status: "done",
          url: image.imgUrl,
        })),
      );
    }
  }, [consignment, form]);

  async function handlePreview(file: UploadFile) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || file.preview || "");
    setPreviewOpen(true);
  }

  const handleUploadChange: UploadProps["onChange"] = ({ fileList, file }) => {
    if (file.status === "removed" && file.url) {
      setDeletedImages((prev) => [...prev, file.url!]);
    }
    setFileList(fileList);
    form.setFieldsValue({ buildingImg: fileList });
  };

  const { data: buildingTypesData, isLoading: isBuildingTypesLoading } =
    useQuery({
      queryKey: ["building-types"],
      queryFn: buildingTypeService.getAllBuildingTypes,
    });

  const buildingTypeOptions = buildingTypesData?.payload?.map((type) => ({
    label: type.buildingTypeName,
    value: type.buildingTypeId,
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
          return query.queryKey.includes("buildings");
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
        consignmentStatusHistories: [
          ...consignment.consignmentStatusHistories,
          {
            status: ConsignmentStatus.ADDITIONAL_INFO,
          },
        ],
        // rentalPricing: [
        //   ...consignment.rentalPricing,
        //   {
        //     price: values.rentalPricing[values.rentalPricing.length - 1]?.price,
        //   },
        // ],
        buildingUnits: values.buildingUnits.map((unit) => ({
          ...unit,
          rentAreas: unit.rentAreas.map((area) => ({
            ...area,
            area: area.area,
          })),
          rentalPricing: [
            {
              price: unit.rentalPricing[unit.rentalPricing.length - 1]?.price,
            },
          ],
        })),
        paymentPolicies: [
          ...consignment.paymentPolicies,
          {
            paymentCycle:
              values.paymentPolicies[values.paymentPolicies.length - 1]
                ?.paymentCycle,
            depositTerm:
              values.paymentPolicies[values.paymentPolicies.length - 1]
                ?.depositTerm,
          },
        ],
        fees: values.fees.map((fee) => ({
          ...fee,
          feePricing: [
            {
              priceUnit: fee.feePricing[fee.feePricing.length - 1]?.priceUnit,
              priceValue: fee.feePricing[fee.feePricing.length - 1]?.priceValue,
              description:
                fee.feePricing[fee.feePricing.length - 1]?.description,
            },
          ],
        })),
      };

      formData.append("customer", JSON.stringify(toSnakeCase(consignments)));

      if (fileList.length > 0) {
        fileList.forEach((file) => {
          formData.append("buildingImg", file.originFileObj as FileType);
        });
      } else {
        formData.append("buildingImg", "");
      }

      if (deletedImages.length > 0) {
        deletedImages.forEach((image) => {
          formData.append("deleted_images", image);
        });
      }
      console.log("Danh sách ảnh bị xoá gửi lên backend:", deletedImages);
      updateCustomer(
        {
          consignmentId: consignment.buildingId.toString(),
          updatedConsignment: formData,
        },
        {
          onSuccess: (res) => {
            console.log("Response từ API:", res);
            toast.success("Cập nhật tài sản thành công");
            navigate("/");
          },
          onError: (error) => {
            console.error("Lỗi cập nhật tài sản:", error);
            toast.error("Cập nhật tài sản thất bại");
          },
        },
      );
    }
  }

  if (
    isVerifyingToken ||
    isFetchingConsignment ||
    isBuildingTypesLoading ||
    isFeeTypesLoading
  ) {
    return <Loading />;
  }

  if (isTokenInvalid || !consignmentId) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="rounded-md bg-white p-6 shadow-md">
        <h2 className="mb-2 text-xl font-semibold text-gray-800">
          Nội dung <span className="text-red-500">cần bổ sung</span>
        </h2>
        <p className="text-sm leading-relaxed text-gray-700">
          <div dangerouslySetInnerHTML={{ __html: note }} />
        </p>
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
                name={["customer", "customerName"]}
                rules={[
                  {
                    required: true,
                    message: "Họ và tên không được để trống!",
                  },
                ]}
                className="flex-1"
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
                className="flex-1"
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
                className="flex-1"
              >
                <Input placeholder="Nhập số điện thoại" allowClear />
              </Form.Item>
            </div>
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
            <div className="flex flex-wrap gap-4">
              <Form.Item
                label="Tên tài sản"
                name={["buildingName"]}
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
                name={["buildingType", "buildingTypeId"]}
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
                name={[
                  "rentalPricing",
                  form.getFieldValue("rentalPricing")?.length - 1,
                  "price",
                ]}
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
                name={["city"]}
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
                name={["district"]}
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
                name={["ward"]}
                className="flex-1"
                rules={[
                  {
                    required: true,
                    message: "Phường/Xã không được để trống!",
                  },
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
                name={["street"]}
                rules={[
                  { required: true, message: "Đường không được để trống!" },
                ]}
              >
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>
              <Form.Item
                className="flex-2"
                label="Số nhà"
                name={["buildingNumber"]}
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
                name={["orientation"]}
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
                label="Số tầng"
                name={["numberOfFloors"]}
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
                label="Tổng diện tích"
                name={["totalArea"]}
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
                <Form.List name={["buildingUnits"]}>
                  {(fields, { add, remove }) => (
                    <div>
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} className="mb-2 flex flex-wrap gap-4">
                          <Form.Item
                            {...restField}
                            name={[name, "floor"]}
                            label="Tầng"
                            rules={[
                              { required: true, message: "Nhập số tầng!" },
                            ]}
                            className="w-14"
                          >
                            <InputNumber
                              min={1}
                              style={{ width: "100%" }}
                              placeholder="Nhập số tầng"
                            />
                          </Form.Item>
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
                            name={[
                              name,
                              "rentalPricing",
                              form.getFieldValue([
                                "buildingUnits",
                                name,
                                "rentalPricing",
                              ])?.length - 1,
                              "price",
                            ]}
                            label="Giá cho thuê"
                            rules={[
                              {
                                required: true,
                                message: "Giá cho thuê không được để trống!",
                              },
                            ]}
                            className="flex-[2]"
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
                <Form.List name={["fees"]}>
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
                            name={[
                              name,
                              "feePricing",
                              form.getFieldValue(["fees", name, "feePricing"])
                                ?.length - 1,
                              "priceValue",
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
                                <Select
                                  placeholder="Chọn đơn vị"
                                  options={[
                                    {
                                      value: "VND/m²/tháng",
                                      label: "VND/m²/tháng",
                                    },
                                    {
                                      value: "VND/xe/tháng",
                                      label: "VND/xe/tháng",
                                    },
                                    {
                                      value: "VND/tháng",
                                      label: "VND/tháng",
                                    },
                                    { value: "VND/quý", label: "VND/quý" },
                                    { value: "VND/năm", label: "VND/năm" },
                                    { value: "VND/lần", label: "VND/lần" },
                                  ]}
                                  allowClear
                                  showSearch
                                  value={form.getFieldValue([
                                    "fees",
                                    name,
                                    "feePricing",
                                    form.getFieldValue([
                                      "fees",
                                      name,
                                      "feePricing",
                                    ])?.length - 1,
                                    "priceUnit",
                                  ])}
                                  onChange={(value) => {
                                    form.setFieldValue(
                                      [
                                        "fees",
                                        name,
                                        "feePricing",
                                        form.getFieldValue([
                                          "fees",
                                          name,
                                          "feePricing",
                                        ])?.length - 1,
                                        "priceUnit",
                                      ],
                                      value,
                                    );
                                  }}
                                  filterOption={(input, option) =>
                                    option?.label
                                      .toLowerCase()
                                      .includes(input.toLowerCase()) ?? false
                                  }
                                />
                              }
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[
                              name,
                              "feePricing",
                              form.getFieldValue(["fees", name, "feePricing"])
                                ?.length - 1,
                              "description",
                            ]}
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
                name={[
                  "paymentPolicies",
                  form.getFieldValue("paymentPolicies")?.length - 1,
                  "paymentCycle",
                ]}
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
                name={[
                  "paymentPolicies",
                  form.getFieldValue("paymentPolicies")?.length - 1,
                  "depositTerm",
                ]}
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
            <Form.Item label="Nội dung" name={["description"]}>
              <JoditEditor
                value={form.getFieldValue(["description"])}
                onChange={(value) => {
                  const description = value;
                  form.setFieldsValue({ description });
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
                beforeUpload={() => true}
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
