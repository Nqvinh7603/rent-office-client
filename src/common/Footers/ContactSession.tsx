import React from "react";

const ContactSection: React.FC = () => {
  return (
    <div className="bg-[#3162ad] py-10 text-white">
      {/* Title */}
      <h2 className="text-center text-3xl font-bold leading-tight">
        Giúp bạn nhanh chóng tìm được <br /> văn phòng phù hợp
      </h2>

      {/* Steps */}
      <div className="mt-8 grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:mx-auto lg:max-w-5xl">
        {/* Step 1 */}
        <div className="flex items-start space-x-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold text-[#3162ad]">
            1
          </div>
          <p className="text-left text-[16px] leading-6">
            Liên hệ Cyber Real để được tư vấn và nhận báo giá các toà nhà phù
            hợp
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex items-start space-x-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold text-[#3162ad]">
            2
          </div>
          <p className="text-left text-[16px] leading-6">
            Khảo sát văn phòng thực tế và làm việc với các toà nhà được chọn
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex items-start space-x-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold text-[#3162ad]">
            3
          </div>
          <p className="text-left text-[16px] leading-6">
            Đàm phán và ký hợp đồng thuê văn phòng với vị trí phù hợp nhất
          </p>
        </div>

        {/* Step 4 */}
        <div className="flex items-start space-x-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold text-[#3162ad]">
            4
          </div>
          <p className="text-left text-[16px] leading-6">
            Thiết kế - Thi công văn phòng mới
          </p>
        </div>
      </div>

      {/* Hotline Button */}
      <div className="mt-8 text-center">
        <button className="rounded-md bg-red-500 px-8 py-4 text-lg font-bold shadow-md">
          Hotline: 0932.020.099
        </button>
      </div>

      {/* Request Button */}
      <div className="mt-6 text-center">
        <button className="rounded-md border-2 border-white px-8 py-4 text-lg font-semibold text-white transition hover:bg-white hover:text-[#3162ad]">
          Gửi yêu cầu thuê
        </button>
      </div>
    </div>
  );
};

export default ContactSection;
