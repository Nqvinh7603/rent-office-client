import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../common/Breadcrums";
import useAddressOptions from "../hooks/useAddressOptions";

const { TextArea } = Input;

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

  const handleProvinceChange = (value: string) => {
    setSelectedRegion(value);
  };

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
          <Form layout="vertical" className="">
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[
                { required: true, message: "Họ và tên không được để trống!" },
              ]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input placeholder="Nhập email" />
            </Form.Item>
            <Form.Item label="Điện thoại" name="phone">
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item label="Địa chỉ" name="address">
              <TextArea placeholder="Nhập địa chỉ" rows={2} />
            </Form.Item>

            <h2 className="mb-4 mt-6 text-xl font-bold text-gray-800">
              Thông tin <span className="text-red-500">sản phẩm ký gửi</span>
            </h2>
            <Form.Item label="Giá cho thuê" name="price">
              <Input placeholder="VD: 12 triệu/m2" />
            </Form.Item>
            <div className="flex flex-wrap gap-4">
              <Form.Item label="Khu vực" name="area" className="flex-1">
                <Select
                  allowClear
                  showSearch
                  value={
                    addressOptions.find(
                      (option) =>
                        Number(option.value) === Number(selectedRegion),
                    )?.label
                  }
                  placeholder="Chọn khu vực "
                  optionFilterProp="label"
                  options={addressOptions}
                  onChange={handleProvinceChange}
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
              <Form.Item label="Quận/Huyện" name="district" className="flex-1">
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
                    <Select.Option key={district.code} value={district.code}>
                      {district.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Phường/Xã" name="ward" className="flex-1">
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
                    <Select.Option key={ward.code} value={ward.code}>
                      {ward.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <Form.Item label="Đường" name="street">
              <Input placeholder="Nhập đường" />
            </Form.Item>
            <Form.Item label="Nội dung" name="content">
              <TextArea placeholder="Mô tả thêm về sản phẩm ký gửi" rows={3} />
            </Form.Item>

            <Form.Item label="Tải hình ảnh" name="upload">
              <Upload beforeUpload={() => false} listType="text">
                <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
              </Upload>
              <small className="text-gray-500">
                Chọn cùng lúc nhiều hình ảnh để gửi (tối đa 10 ảnh).
              </small>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-[#3162ad] hover:bg-[#3162ad]"
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
