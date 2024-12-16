import React from "react";
import {
  FacebookFilled,
  TwitterOutlined,
  LinkedinFilled,
  InstagramOutlined,
  YoutubeFilled,
} from "@ant-design/icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-8 text-xs text-white">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Company Info */}
        <div>
          <h3 className="mb-4 text-sm font-semibold">KẾT NỐI VỚI CHÚNG TÔI</h3>
          <p className="font-bold">Công Ty Cổ Phần Bất Động Sản Cyber Real</p>
          <p className="text-gray-400">Mã Số Thuế: 0315314835</p>
          <p className="text-gray-400">
            Địa chỉ: L18-11-13, Tầng 18, Vincom Center Đồng Khởi, 72 Lê Thánh
            Tôn, Phường Bến Nghé, Quận 1, Tp HCM
          </p>
          <p className="mt-2 font-bold">Điện thoại: 0932 020 099</p>
          <p>
            Email:{" "}
            <span className="font-semibold text-white">info@cyberreal.vn</span>
          </p>
          {/* Social Icons */}
          <div className="mt-4 flex space-x-4">
            <a href="#" className="text-2xl text-white hover:text-gray-400">
              <FacebookFilled />
            </a>
            <a href="#" className="text-2xl text-white hover:text-gray-400">
              <TwitterOutlined />
            </a>
            <a href="#" className="text-2xl text-white hover:text-gray-400">
              <LinkedinFilled />
            </a>
            <a href="#" className="text-2xl text-white hover:text-gray-400">
              <InstagramOutlined />
            </a>
            <a href="#" className="text-2xl text-white hover:text-gray-400">
              <YoutubeFilled />
            </a>
          </div>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="mb-4 text-sm font-semibold">HỖ TRỢ KHÁCH HÀNG</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Giới Thiệu Về Cyber Real
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Chính Sách Bảo Mật
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Liên Hệ
              </a>
            </li>
          </ul>
        </div>

        {/* Additional Links */}
        <div>
          <h3 className="mb-4 text-sm font-semibold">THÔNG TIN KHÁC</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Điều Khoản Sử Dụng
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Chính Sách Bảo Hành
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Hướng Dẫn Mua Hàng
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
        © 2024 - Cyber Real - Đơn Vị Cho Thuê Văn Phòng Hàng Đầu TP HCM
      </div>
    </footer>
  );
};

export default Footer;
