import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const AboutContent: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-10 pt-0">
      <div className="mb-6 flex items-center space-x-2 text-gray-500">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          className="flex items-center text-gray-700 hover:text-black"
          onClick={handleNavigateHome}
        />
        <span className="text-sm font-medium uppercase">
          <span
            className="cursor-pointer hover:text-black"
            onClick={handleNavigateHome}
          >
            TRANG CHỦ
          </span>
          {" / "}
          <span
            className="cursor-pointer hover:text-black"
            onClick={handleNavigateHome}
          >
            GIỚI THIỆU VỀ CYBER REAL
          </span>
        </span>
      </div>

      {/* Nội Dung Chính */}
      <div className="rounded-lg bg-white p-8 shadow-md">
        {/* Tiêu Đề */}
        <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900">
          Giới Thiệu Về Cyber Real
        </h1>

        {/* Đoạn Văn Bản */}
        <div className="space-y-6 text-sm leading-relaxed text-gray-700">
          <p>
            Công Ty Cổ Phần Bất Động Sản{" "}
            <span className="font-bold">Cyber Real</span> được thành lập vào năm{" "}
            <span className="font-bold">2018</span>, với đội ngũ có hơn{" "}
            <span className="font-bold">7-10 năm kinh nghiệm</span> trong lĩnh
            vực cho thuê văn phòng tại thành phố Hồ Chí Minh. Với sự nhanh nhạy
            nắm bắt được nhu cầu thị trường ngày càng tăng cao do sự phát triển
            đô thị hóa tại TP Hồ Chí Minh, nên Cyber Real ra đời cùng với sứ
            mệnh hỗ trợ doanh nghiệp tìm kiếm văn phòng làm việc tốt nhất với
            chi phí phù hợp nhất.
          </p>

          <p>
            Cyber Real chúng tôi sở hữu một đội ngũ nhân sự dày dặn kinh nghiệm
            nhưng không kém phần năng động và tràn đầy nhiệt huyết của tuổi trẻ
            khát khao thể hiện. Vì vậy chúng tôi sẵn sàng tiếp nhận mọi nhu cầu
            của khách hàng, nhanh chóng phân tích đánh giá từng ưu và khuyết
            điểm từng cao ốc để tìm kiếm văn phòng tòa nhà phù hợp và sẵn sàng
            hỗ trợ tư vấn nhanh nhất nhằm đáp ứng các nhu cầu của khách hàng một
            cách tốt nhất.
          </p>

          <p>
            Chúng tôi hiện đang sở hữu một kho dữ liệu khổng lồ, có liên kết với
            hầu hết các tòa nhà cho thuê văn phòng tại thành phố Hồ Chí Minh.
            Trong đó có đầy đủ các dạng văn phòng từ giá rẻ đến văn phòng cao
            cấp hạng A, B, C. Bên cạnh đó còn có hệ thống văn phòng cho thuê
            trọn gói và cả thuê riêng tòa nhà.
          </p>

          <p>
            Cyber Real là một trong những công ty uy tín chuyên nghiệp nhất hiện
            nay trong lĩnh vực cho thuê văn phòng làm việc. Tất cả những thông
            tin dữ liệu mà chúng tôi xây dựng đều vì mong muốn hoàn thành sứ
            mệnh hỗ trợ các doanh nghiệp nhanh chóng sở hữu một văn phòng làm
            việc cho thuê tốt nhất, phù hợp nhất với mức giá thuê hợp lý hoàn
            toàn nằm trong khả năng của doanh nghiệp.
          </p>
        </div>
      </div>

      {/* Thêm Phần Khách Hàng Thuê */}
      <div className="mt-10 rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-bold leading-tight text-gray-900">
          Những ưu điểm khách hàng thuê văn phòng tại Cyber Real
        </h2>
        <div className="space-y-6 text-sm leading-relaxed text-gray-700">
          <p className="font-semibold italic">
            Luôn cung cấp và update những thông tin, hình ảnh mới nhất của các
            tòa nhà văn phòng cho thuê
          </p>
          <p>
            Nhờ có đội ngũ nhiệt tình, năng động mà các hình ảnh của Cyber Real
            luôn được cập nhật mới nhất. Tất cả hình ảnh trên website đều là độc
            quyền của Cyber Real do chúng tôi trực tiếp đến các tòa văn phòng
            xem xét và chụp lại, vì vậy đảm bảo tính xác thực 100%.
          </p>

          <p className="font-semibold italic">
            Đội ngũ nhân sự chuyên nghiệp, sẵn sàng tư vấn 24/7
          </p>
          <p>
            Với nhiều năm kinh nghiệm và hệ thống rộng khắp TP Hồ Chí Minh, đội
            ngũ Cyber Real luôn đồng hành và hỗ trợ tư vấn nhanh chóng, tiết
            kiệm thời gian cho doanh nghiệp.
          </p>
        </div>
      </div>

      {/* Quy Trình */}
      <div className="mt-10 rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-bold leading-tight text-gray-900">
          Quy trình nhanh chóng tìm được văn phòng cho thuê phù hợp
        </h2>
        <ul className="list-decimal space-y-2 pl-6 text-sm text-gray-700">
          <li>
            Liên hệ Cyber Real để được tư vấn và nhận báo giá các tòa nhà.
          </li>
          <li>Khảo sát văn phòng thực tế và lựa chọn tòa nhà phù hợp.</li>
          <li>Đàm phán và ký hợp đồng thuê văn phòng với vị trí tốt nhất.</li>
          <li>Thiết kế và thi công văn phòng mới theo nhu cầu.</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutContent;
