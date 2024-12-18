import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const PrivacySecureContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-10 pt-0">
      {/* Nút Quay Về Trang Chủ */}
      <div className="mb-6 flex items-center space-x-2 text-gray-500">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          className="flex items-center text-gray-700 hover:text-black"
          onClick={() => navigate("/")}
        />
        <span className="text-sm font-medium uppercase">
          TRANG CHỦ / CHÍNH SÁCH BẢO MẬT
        </span>
      </div>

      {/* Nội Dung Chính */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        {/* Tiêu Đề */}
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          Chính Sách Bảo Mật
        </h1>

        {/* Đoạn Nội Dung */}
        <div className="space-y-4 text-sm leading-relaxed text-gray-700">
          <p>
            Cyber Real luôn xem việc bảo mật thông tin được cung cấp bởi khách
            hàng, đối tác và người dùng truy cập trang web như một nhiệm vụ
            thiết yếu, đi đôi với mục tiêu kinh doanh và sứ mệnh của công ty.
          </p>

          <p>
            Tất cả những thông tin mà khách hàng tự nguyện cung cấp hoặc được
            cung cấp dưới hình thức được{" "}
            <a href="#" className="text-blue-500 hover:text-blue-700">
              văn phòng cho thuê Cyber Real
            </a>{" "}
            yêu cầu cung cấp sẽ được sử dụng đúng theo mục đích đã được công bố
            trên chính sách bảo mật và chính sách quyền riêng tư. Mọi trường hợp
            sử dụng thông tin cho những mục đích khác, không có sự cho phép của
            khách hàng, chúng tôi sẽ chịu trách nhiệm thỏa đáng.
          </p>

          <p>
            Quý khách hàng có quyền cho hoặc không cho thông tin khi nhận được
            thông báo. Cyber Real sẽ chỉ sử dụng thông tin một cách chi tiết và
            cụ thể để đáp ứng nhu cầu tìm kiếm thông tin tốt hơn cho khách hàng.
          </p>

          <p>
            Các thông tin có liên quan đến thông tin cá nhân, hành vi người
            dùng, sở thích và nhu cầu mà khách hàng cung cấp sẽ được bảo mật
            tuyệt đối. Không có sự tham gia của bên thứ 3 dưới hình thức không
            và có trả phí, trừ khi chính khách hàng yêu cầu cung cấp thông tin
            đó cho một bên cụ thể.
          </p>

          <p>
            Nhằm cải thiện tính chính xác trong quá trình truy vấn thông tin của
            người dùng, đồng thời hạn chế tối đa sự rò rỉ thông tin do hacker,
            phần mềm độc hại trên thiết bị của người dùng... Cyber Real sẽ luôn
            nâng cao mức độ bảo mật thông tin một cách tốt nhất. Chúng tôi hy
            vọng điều này sẽ giúp ích cho trải nghiệm của khách hàng.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacySecureContent;