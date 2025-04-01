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
          <h2 className="text-lg font-semibold">
            Phạm vi áp dụng chính sách quyền riêng tư của Cyber Real
          </h2>
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
          <p>
            Chúng tôi thu thập nhiều loại thông tin có ảnh hưởng đến việc sử
            dụng dịch vụ, tra cứu thông tin liên quan đến nhu cầu tìm kiếm của
            khách hàng, cụ thể:
          </p>
          <ul className="list-disc pl-6">
            <li>
              Nhu cầu và mong muốn của khách hàng có liên quan đến dịch vụ của
              chúng tôi.
            </li>
            <li>
              Ý kiến đóng góp và phản hồi về chất lượng dịch vụ, cách làm việc
              của hệ thống, từ đó phát triển và cải thiện dịch vụ, trải nghiệm
              của người dùng.
            </li>
            <li>
              Chúng tôi sẽ yêu cầu cung cấp thông tin cá nhân trong trường hợp
              khách hàng muốn nhận báo giá, tư vấn từ đội ngũ nhân viên hoặc yêu
              cầu bổ sung thông tin, điều chỉnh thông tin sai lệch từ phía khách
              hàng.
            </li>
            <li>
              Trường hợp khách hàng yêu cầu được nhận báo giá hoặc tin tức mới
              nhất từ hệ thống tự động, chúng tôi cũng sẽ gửi thông báo để khách
              hàng cung cấp thông tin phục vụ cho nhu cầu này.
            </li>
            <li>
              Cyber Real sẽ sử dụng bọ web để kiểm tra và thống kê tất cả hành
              vi của khách hàng trên trang web của chúng tôi.
            </li>
            <li>
              Chúng tôi lưu lại nhật kí truy cập, bao gồm cả địa chỉ IP, Cookie
              máy của tất cả khách hàng chỉ để đánh giá nhu cầu tìm kiếm chứ
              không có khả năng nhận diện người dùng nhằm phục vụ tốt nhất cho
              quá trình sử dụng dịch vụ, đảm bảo bảo mật thông tin người dùng.
            </li>
          </ul>

          <h2 className="text-lg font-semibold">
            Điều khoản về sử dụng và chia sẻ thông tin
          </h2>
          <p>Mục đích sử dụng thông tin khách hàng bao gồm:</p>
          <ul className="list-disc pl-6">
            <li>Cung cấp dịch vụ và thông tin mà bạn yêu cầu.</li>
            <li>
              Làm dữ liệu lưu trữ trên hệ thống để giúp đưa thông tin mà khách
              hàng cần một cách nhanh nhất, nâng cao trải nghiệm sử dụng dịch vụ
              của bạn trên hệ thống website, phần mềm của chúng tôi.
            </li>
            <li>
              Phục vụ chiến lược quảng cáo đúng đối tượng, cung cấp đúng dịch vụ
              cho từng khách hàng cụ thể.
            </li>
            <li>
              Tất cả thông tin mà chúng tôi có được sẽ được sử dụng theo đúng
              mục đích mà chúng tôi công bố với khách hàng tại thời điểm thông
              báo và không được tiết lộ với bên thứ 3 mà không có sự cho phép
              của khách hàng.
            </li>
            <li>
              Trường hợp rò rỉ thông tin đến các bên khác sẽ được tất cả các bên
              (bao gồm cả Cyber Real) đứng ra chịu trách nhiệm và giải thích.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyContent;
