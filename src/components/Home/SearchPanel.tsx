import { Button, Input, Select } from "antd";
import React from "react";

const { Option } = Select;

const SearchPanel: React.FC = () => {
  return (
    <div className="translate-y-15 absolute bottom-44 left-1/2 z-10 w-11/12 -translate-x-1/2 transform rounded-md bg-white p-4 shadow-lg lg:w-3/4">
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Input
          placeholder="Nhập tên tòa nhà, ví dụ: Vincom, Vietcombank, International Plaza..."
          className="col-span-3 rounded-md border px-4 py-2 md:col-span-3 lg:col-span-3"
        />
        <Button type="primary" className="py-4 text-white">
          TÌM KIẾM
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
        <Select
          placeholder="Tất cả quận huyện"
          className="w-full rounded-md border"
          allowClear
        >
          <Option value="quan-1">Quận 1</Option>
          <Option value="quan-2">Quận 2</Option>
          <Option value="quan-3">Quận 3</Option>
        </Select>

        <Select
          placeholder="Tất cả phường/xã"
          className="w-full rounded-md border"
          allowClear
        >
          <Option value="phuong-1">Phường 1</Option>
          <Option value="phuong-2">Phường 2</Option>
        </Select>

        <Select
          placeholder="Tất cả đường"
          className="w-full rounded-md border"
          allowClear
        >
          <Option value="duong-a">Đường A</Option>
          <Option value="duong-b">Đường B</Option>
        </Select>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
        {/* Dropdown Filters */}
        <Select
          placeholder="Tất cả diện tích"
          className="w-full rounded-md border"
          allowClear
        >
          <Option value="50m2">Dưới 50m2</Option>
          <Option value="100m2">Dưới 100m2</Option>
        </Select>

        <Select
          placeholder="Tất cả giá"
          className="w-full rounded-md border"
          allowClear
        >
          <Option value="5tr">Dưới 5 triệu</Option>
          <Option value="10tr">Dưới 10 triệu</Option>
        </Select>

        <Select
          placeholder="Tất cả hướng"
          className="w-full rounded-md border"
          allowClear
        >
          <Option value="dong">Hướng Đông</Option>
          <Option value="tay">Hướng Tây</Option>
        </Select>
      </div>
    </div>
  );
};

export default SearchPanel;
