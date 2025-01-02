import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../Breadcrums";

const PrivacyPolicyContent: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-10">
      <Breadcrumbs
        items={[
          { name: "TRANG CHỦ", path: "/" },
          { name: "CHÍNH SÁCH QUYỀN RIÊNG TƯ", path: "" },
        ]}
        onBack={() => navigate("/")}
      />

      {/* Nội Dung Chính */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        {/* Tiêu Đề */}
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          Chính Sách Quyền Riêng Tư
        </h1>

        {/* Nội Dung Chi Tiết */}
        <div className="space-y-4 text-[16px] leading-relaxed text-gray-700">
          <h2 className="text-lg font-semibold">Phạm vi áp dụng chính sách</h2>
          <p>
            Chính sách quyền riêng tư và bảo mật thông tin cá nhân khách hàng
            của Cyber Real được áp dụng trên tất cả các thiết bị truy cập trang
            web (điện thoại, máy tính bảng, TV,…) và phương tiện liên lạc với
            khách hàng như email, zalo, messenger,… (những phương tiện mà khách
            hàng dùng để cung cấp thông tin cá nhân cho chúng tôi).
          </p>

          <h2 className="text-lg font-semibold">
            Thông tin của khách hàng mà Cyber Real thu thập là gì?
          </h2>
          <ul className="list-disc pl-6">
            <li>
              Nhu cầu và mong muốn của khách hàng có liên quan đến dịch vụ của
              chúng tôi.
            </li>
            <li>
              Ý kiến đóng góp và phản hồi về chất lượng dịch vụ, cách làm việc
              của hệ thống, từ đó phát triển và cải thiện dịch vụ.
            </li>
            <li>
              Cung cấp thông tin cá nhân trong trường hợp khách hàng muốn nhận
              báo giá hoặc tư vấn từ đội ngũ nhân viên.
            </li>
            <li>
              Yêu cầu được nhận báo giá hoặc tin tức mới nhất từ hệ thống tự
              động, thông báo và yêu cầu thông tin từ khách hàng.
            </li>
            <li>
              Cyber Real sử dụng bọ web để kiểm tra và thống kê tất cả hành vi
              của khách hàng trên trang web.
            </li>
            <li>
              Chúng tôi lưu lại nhật kí truy cập, bao gồm địa chỉ IP và Cookie
              để đánh giá nhu cầu tìm kiếm, nhưng không nhận diện người dùng.
            </li>
          </ul>

          <h2 className="text-lg font-semibold">
            Điều khoản về sử dụng và chia sẻ thông tin
          </h2>
          <ul className="list-disc pl-6">
            <li>Cung cấp dịch vụ và thông tin mà bạn yêu cầu.</li>
            <li>
              Lưu trữ dữ liệu trên hệ thống để đưa thông tin nhanh nhất và nâng
              cao trải nghiệm dịch vụ.
            </li>
            <li>
              Phục vụ chiến lược quảng cáo đúng đối tượng, cung cấp đúng dịch vụ
              cho từng khách hàng.
            </li>
            <li>
              Tất cả thông tin được sử dụng theo đúng mục đích và không tiết lộ
              với bên thứ 3 khi chưa có sự cho phép của khách hàng.
            </li>
            <li>
              Trường hợp rò rỉ thông tin sẽ được các bên liên quan chịu trách
              nhiệm và giải thích.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyContent;
