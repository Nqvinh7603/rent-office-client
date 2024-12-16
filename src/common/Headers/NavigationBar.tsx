import { Dropdown, Menu } from "antd";
import React from "react";
import { HomeOutlined, DownOutlined } from "@ant-design/icons";

const NavigationBar: React.FC = () => {
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a href="#">Quận 1</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="#">Quận 2</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-[#3162ad] py-4">
        <div className="container mx-auto flex items-center justify-center px-4">
          <ul className="flex space-x-6 font-medium text-white">
            <li>
              <a
                href="/"
                className="flex items-center hover:underline"
                style={{ fontSize: "14px" }}
              >
                <HomeOutlined className="mr-1" /> Trang chủ
              </a>
            </li>
            <li>
              <Dropdown overlay={menu}>
                <a
                  href="#"
                  className="flex items-center hover:underline"
                  style={{ fontSize: "14px" }}
                >
                  Văn Phòng Theo Quận <DownOutlined className="ml-1" />
                </a>
              </Dropdown>
            </li>
            <li>
              <Dropdown overlay={menu}>
                <a
                  href="#"
                  className="flex items-center hover:underline"
                  style={{ fontSize: "14px" }}
                >
                  Văn Phòng Trọn Gói <DownOutlined className="ml-1" />
                </a>
              </Dropdown>
            </li>
            <li>
              <Dropdown>
                <a
                  href="#"
                  className="flex items-center hover:underline"
                  style={{ fontSize: "14px" }}
                >
                  Văn Phòng Hạng A <DownOutlined className="ml-1" />
                </a>
              </Dropdown>
            </li>
            <li>
              <Dropdown overlay={menu}>
                <a
                  href="#"
                  className="flex items-center hover:underline"
                  style={{ fontSize: "14px" }}
                >
                  Văn Phòng Giá Rẻ <DownOutlined className="ml-1" />
                </a>
              </Dropdown>
            </li>
            <li>
              <Dropdown overlay={menu}>
                <a
                  href="#"
                  className="flex items-center hover:underline"
                  style={{ fontSize: "14px" }}
                >
                  Thuê Toà Nhà <DownOutlined className="ml-1" />
                </a>
              </Dropdown>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default NavigationBar;
