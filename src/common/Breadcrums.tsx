import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

interface BreadcrumbItem {
  name: string;
  path?: string; // Optional, nếu không có thì là phần tử cuối cùng
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]; // Mảng các breadcrumb
  onBack?: () => void; // Tùy chọn, xử lý nút quay lại
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onBack }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6 flex items-center space-x-2 text-gray-500">
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        className="flex items-center text-gray-700 hover:text-black"
        onClick={onBack || (() => navigate(-1))} // Fallback nếu onBack không có
      />
      <span className="text-sm font-medium uppercase">
        {items.map((item, index) => (
          <span key={index}>
            {item.path ? (
              <span
                className="cursor-pointer hover:text-gray-700"
                onClick={() => item.path && navigate(item.path)}
              >
                {item.name}
              </span>
            ) : (
              <span className="text-gray-400">{item.name}</span>
            )}
            {index < items.length - 1 && " / "}
          </span>
        ))}
      </span>
    </div>
  );
};

export default Breadcrumbs;
