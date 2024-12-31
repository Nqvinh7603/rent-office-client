import React, { useState } from "react";
import RequestFormModal from "../../features/contact/components/RequestFormModal";

const ContactSection: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bg-[#3162ad] py-10 text-white">
      <h2 className="text-center text-3xl font-bold leading-tight">
        Giúp bạn nhanh chóng tìm được <br /> văn phòng phù hợp
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:mx-auto lg:max-w-5xl">
        {[
          "Liên hệ Cyber Real để được tư vấn và nhận báo giá các toà nhà phù hợp",
          "Khảo sát văn phòng thực tế và làm việc với các toà nhà được chọn",
          "Đàm phán và ký hợp đồng thuê văn phòng với vị trí phù hợp nhất",
          "Thiết kế - Thi công văn phòng mới",
        ].map((step, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold text-[#3162ad]">
              {index + 1}
            </div>
            <p className="text-left text-[16px] leading-6">{step}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button className="rounded-md bg-red-500 px-8 py-4 text-lg font-bold shadow-md">
          Hotline: 0991.463.436
        </button>
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={showModal}
          className="rounded-md border-2 border-solid border-white px-8 py-4 text-lg font-semibold text-white transition hover:bg-white hover:text-[#3162ad]"
        >
          Gửi yêu cầu thuê
        </button>
      </div>
      <RequestFormModal visible={isModalVisible} onClose={closeModal} />
    </div>
  );
};

export default ContactSection;
