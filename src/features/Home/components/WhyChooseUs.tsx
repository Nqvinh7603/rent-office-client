const WhyChooseUs: React.FC = () => {
  const items = [
    {
      title: "3000++",
      subtitle: "Văn phòng cho thuê",
      description:
        "Hệ thống tòa nhà và cao ốc văn phòng cho thuê khắp Tp. Hồ Chí Minh.",
    },
    {
      title: "10++",
      subtitle: "Kinh nghiệm",
      description:
        "Hơn 10 năm kinh nghiệm và hơn 40 chuyên viên tư vấn giàu kinh nghiệm.",
    },
    {
      title: "4500++",
      subtitle: "Khách hàng",
      description:
        "Khách hàng đã đồng hành và tin tưởng dịch vụ tư vấn văn phòng tại Cyber Real.",
    },
  ];

  const benefits = [
    { icon: "🔍", text: "Tiết kiệm 95% nguồn lực tìm kiếm" },
    { icon: "📄", text: "Có ngay báo giá phù hợp" },
    { icon: "👤", text: "Được chuyên viên tư vấn phân tích" },
    { icon: "🤝", text: "Hỗ trợ đàm phán, thương lượng" },
  ];

  return (
    <div className="-my-2 mx-auto mb-12 w-11/12 text-center lg:w-3/4">
      {/* Section Title */}
      <h2 className="text-[30px] font-bold leading-tight text-[#3162ad]">
        Lý Do Nên Chọn Cyber Real Làm Đơn Vị Đồng Hành
      </h2>
      <p className="mt-4 text-[16px] leading-relaxed text-gray-600">
        Với hơn 5000++ sàn văn phòng chuyên nghiệp hạng A, B, C, Giá rẻ và hơn
        3000++ cao ốc văn phòng cho thuê tại Tp.HCM cùng hơn 100++ đối tác là
        các Co-working Space. Đa dạng diện tích cho thuê từ 30m2 - 3000m2.
      </p>

      {/* Highlight Cards */}
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative rounded-lg bg-white p-6 shadow-md"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 transform rounded-md bg-[#3162ad] px-4 py-2 text-[18px] font-bold text-white">
              {item.title}
            </div>
            <h3 className="mt-8 text-[18px] font-semibold text-[#3162ad]">
              {item.subtitle}
            </h3>
            <p className="mt-2 text-[14px] leading-6 text-gray-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#3162ad] text-[20px] text-white">
              {benefit.icon}
            </div>
            <p className="mt-4 text-[14px] font-semibold text-gray-600">
              {benefit.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
