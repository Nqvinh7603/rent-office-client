import {
  FacebookFilled,
  InstagramOutlined,
  LinkedinFilled,
  TwitterOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import React from "react";
import ContactSection from "./ContactSession";

const Footer: React.FC = () => (
  <>
    <ContactSection />
    <footer className="bg-black py-8 text-xs text-white">
      <div className="container mx-auto flex flex-col items-center justify-center gap-y-8 px-4 md:flex-row md:justify-between">
        {/* Company Info */}
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-sm font-semibold">KẾT NỐI VỚI CHÚNG TÔI</h3>
          <p className="font-bold">Công Ty Cổ Phần Bất Động Sản Cyber Real</p>
          <p className="text-gray-400">
            Địa chỉ: L18-11-13, Tầng 18, Vincom Center Đồng Khởi, 72 Lê Thánh
            Tôn, Phường Bến Nghé, Quận 1, Tp HCM
          </p>
          <p className="mt-2 font-bold">Điện thoại: 0932 020 099</p>
          <p>
            Email:{" "}
            <span className="font-semibold text-white">info@cyberreal.vn</span>
            <br />
            Website:{" "}
            <span className="font-semibold text-white">www.cyberreal.vn</span>
          </p>

          <div className="flex justify-center space-x-4 md:justify-start">
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
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-sm font-semibold">HỖ TRỢ KHÁCH HÀNG</h3>
          <ul className="space-y-2">
            {[
              "Giới Thiệu Về Cyber Real",
              "Chính Sách Bảo Mật",
              "Chính Sách Quyền Riêng Tư",
              "Tin Tức",
              "Liên Hệ",
              "Quy đổi tỷ giá",
            ].map((item, index) => (
              <li key={index}>
                <a href="#" className="text-gray-400 hover:text-white">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-sm font-semibold">THÔNG TIN KHÁC</h3>
          <ul className="space-y-2">
            {[
              "Điều Khoản Sử Dụng",
              "Chính Sách Bảo Hành",
              "Hướng Dẫn Mua Hàng",
              "Hướng Dẫn Thanh Toán",
              "Hướng Dẫn Giao Nhận",
            ].map((item, index) => (
              <li key={index}>
                <a href="#" className="text-gray-400 hover:text-white">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
        © 2024 - Cyber Real - Đơn Vị Cho Thuê Văn Phòng Hàng Đầu TP HCM
      </div>
    </footer>
  </>
);

export default Footer;
