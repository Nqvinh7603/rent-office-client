// import {
//   ClockCircleOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   StarOutlined,
// } from "@ant-design/icons";
// import { Button } from "antd";
// import React from "react";
// import NavigationBar from "./NavigationBar";

// const Header: React.FC = () => {
//   return (
//     <header className="shadow-md">
//       <div className="bg-white py-4">
//         <div className="container mx-auto flex items-center justify-between">
//           <div className="flex items-center">
//             <a href="/">
//               <img
//                 src="/src/assets/image/logo.png"
//                 alt="Cyber Real"
//                 className="w-35 h-10"
//               />
//             </a>
//           </div>

//           <div className="hidden space-x-14 text-gray-700 md:flex">
//             <div className="flex items-center">
//               <ClockCircleOutlined className="mr-2 text-2xl" />
//               <div>
//                 <span style={{ fontSize: "12px" }} className="block">
//                   Thời gian làm việc
//                 </span>
//                 <h6 style={{ fontSize: "14px" }} className="font-semibold">
//                   24/7
//                 </h6>
//               </div>
//             </div>
//             <div className="flex items-center">
//               <PhoneOutlined className="mr-2 text-2xl" />
//               <div>
//                 <span style={{ fontSize: "12px" }} className="block">
//                   Hotline
//                 </span>
//                 <h6 style={{ fontSize: "14px" }} className="font-semibold">
//                   0932.020.099
//                 </h6>
//               </div>
//             </div>
//             <div className="flex items-center">
//               <MailOutlined className="mr-2 text-2xl" />
//               <div>
//                 <span style={{ fontSize: "12px" }} className="block">
//                   Email tư vấn
//                 </span>
//                 <h6 style={{ fontSize: "14px" }} className="font-semibold">
//                   info@cyberreal.vn
//                 </h6>
//               </div>
//             </div>
//           </div>
//           <Button
//             type="primary"
//             icon={<StarOutlined />}
//             className="border-none bg-yellow-500 font-semibold text-white hover:bg-yellow-600"
//           >
//             Kí gửi
//           </Button>
//         </div>
//       </div>
//       <NavigationBar />
//     </header>
//   );
// };

// export default Header;
import {
  ClockCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Header: React.FC = () => {
  const navigate = useNavigate(); // Khởi tạo hook useNavigate

  const handleNavigate = () => {
    navigate("/deposit"); // Điều hướng tới trang Ký gửi
  };

  return (
    <header className="shadow-md">
      <div className="bg-white py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <a href="/">
              <img
                src="/src/assets/image/logo.png"
                alt="Cyber Real"
                className="w-35 h-10"
              />
            </a>
          </div>

          <div className="hidden space-x-14 text-gray-700 md:flex">
            <div className="flex items-center">
              <ClockCircleOutlined className="mr-2 text-2xl" />
              <div>
                <span style={{ fontSize: "12px" }} className="block">
                  Thời gian làm việc
                </span>
                <h6 style={{ fontSize: "14px" }} className="font-semibold">
                  24/7
                </h6>
              </div>
            </div>
            <div className="flex items-center">
              <PhoneOutlined className="mr-2 text-2xl" />
              <div>
                <span style={{ fontSize: "12px" }} className="block">
                  Hotline
                </span>
                <h6 style={{ fontSize: "14px" }} className="font-semibold">
                  0932.020.099
                </h6>
              </div>
            </div>
            <div className="flex items-center">
              <MailOutlined className="mr-2 text-2xl" />
              <div>
                <span style={{ fontSize: "12px" }} className="block">
                  Email tư vấn
                </span>
                <h6 style={{ fontSize: "14px" }} className="font-semibold">
                  info@cyberreal.vn
                </h6>
              </div>
            </div>
          </div>

          {/* Button Navigate */}
          <Button
            type="primary"
            icon={<StarOutlined />}
            className="border-none bg-yellow-500 font-semibold text-white hover:bg-yellow-600"
            onClick={handleNavigate} // Thêm sự kiện onClick
          >
            Kí gửi
          </Button>
        </div>
      </div>
      <NavigationBar />
    </header>
  );
};

export default Header;
