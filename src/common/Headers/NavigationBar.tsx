import { DownOutlined, HomeOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";

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

  const [isSticky, setIsSticky] = useState(false);

  // Hàm xử lý sự kiện cuộn trang
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const stickyThreshold = 75;
    setIsSticky(scrollTop > stickyThreshold);
  };

  // Gắn và gỡ bỏ sự kiện cuộn trang
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <nav
        className={`w-full bg-[var(--color-primary)] py-4 transition-all duration-300 ${
          isSticky
            ? "fixed top-0 z-50 translate-y-0 transform shadow-lg"
            : "relative"
        }`}
      >
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
    </div>
  );
};
export default NavigationBar;
