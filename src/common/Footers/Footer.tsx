import {
  FacebookFilled,
  InstagramOutlined,
  LinkedinFilled,
  TwitterOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ContactSection from "./ContactSession";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const customerSupport = [
    {
      name: "Giới Thiệu Về Cyber Real",
      path: "/gioi-thieu-ve-cyber-real",
    },
    { name: "Chính Sách Bảo Mật", path: "/chinh-sach-bao-mat" },
    { name: "Chính Sách Quyền Riêng Tư", path: "/chinh-sach-quyen-rieng-tu" },
    { name: "Liên Hệ", path: "/lien-he" },
  ];

  return (
    <>
      <ContactSection />
      <footer className="bg-black py-8 text-xs text-white">
        <div className="container mx-auto grid translate-x-5 grid-cols-1 gap-8 px-4 md:grid-cols-3 lg:grid-cols-3">
          {/* Cột 1: Thông Tin Công Ty */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-base font-semibold uppercase">
              Kết Nối Với Chúng Tôi
            </h3>
            <p className="font-bold text-white">
              Công Ty Cổ Phần Bất Động Sản Cyber Real
            </p>
            <p className="leading-relaxed text-gray-400">
              Địa chỉ: L18-11-13, Tầng 18, Vincom Center Đồng Khởi, Quận 1,
              TP.HCM
            </p>
            <p className="font-bold text-gray-200">Hotline: 0932 020 099</p>
            <p>
              Email: <span className="font-semibold">info@cyberreal.vn</span>
            </p>
            <div className="flex justify-center space-x-4 md:justify-start">
              {[
                { icon: <FacebookFilled />, link: "#" },
                { icon: <TwitterOutlined />, link: "#" },
                { icon: <LinkedinFilled />, link: "#" },
                { icon: <InstagramOutlined />, link: "#" },
                { icon: <YoutubeFilled />, link: "#" },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-400 transition-all duration-200 hover:text-white"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="mx-20 space-y-4 text-center md:text-left">
            <h3 className="text-base font-semibold uppercase">
              Hỗ Trợ Khách Hàng
            </h3>
            <ul className="space-y-2">
              {customerSupport.map((item, index) => (
                <li key={index}>
                  <span
                    onClick={() => navigate(item.path)}
                    className="cursor-pointer leading-6 text-gray-400 transition-all duration-200 hover:text-white"
                  >
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-base font-semibold uppercase">Tin tức</h3>
            <p className="leading-relaxed text-gray-400">
              Cập nhật tin tức về bất động sản mới nhất.
            </p>
            <span
              onClick={() => navigate("#")}
              className="cursor-pointer text-blue-400 transition-all duration-200 hover:text-white"
            >
              Xem tin tức
            </span>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
          © 2024 - Cyber Real | Đơn Vị Cho Thuê Văn Phòng Hàng Đầu TP HCM
        </div>
      </footer>
    </>
  );
};

export default Footer;
