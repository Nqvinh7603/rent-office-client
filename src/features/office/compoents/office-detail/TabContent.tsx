import React from "react";

interface TabContentProps {
  dynamicData: {
    generalInfo: string;
    location: string;
    structure: string;
    serviceFee: string;
    advantages: string;
    comparison: React.ReactNode;
    review: React.ReactNode;
  };
  sections: {
    generalInfo: React.RefObject<HTMLDivElement>;
    location: React.RefObject<HTMLDivElement>;
    structure: React.RefObject<HTMLDivElement>;
    serviceFee: React.RefObject<HTMLDivElement>;
    advantages: React.RefObject<HTMLDivElement>;
    comparison: React.RefObject<HTMLDivElement>;
    review: React.RefObject<HTMLDivElement>;
  };
}

const TabContent: React.FC<TabContentProps> = ({ dynamicData, sections }) => {
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?q=place_id:ChIJL_P_CXMEDTERH2Kq2n0ObTk&key=YOUR_GOOGLE_MAPS_API_KEY`;

  return (
    <div className="mt-6">
      {/* Nội dung tổng hợp */}
      <div className="mx-auto mt-6 rounded-lg border border-gray-300 bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-lg font-bold text-[#3162ad]">TỔNG QUAN</h2>
        {[
          {
            key: "generalInfo",
            label: "THÔNG TIN CHUNG",
            content: dynamicData.generalInfo,
          },
          { key: "location", label: "VỊ TRÍ", content: dynamicData.location },
          {
            key: "structure",
            label: "KẾT CẤU",
            content: dynamicData.structure,
          },
          {
            key: "serviceFee",
            label: "PHÍ DỊCH VỤ",
            content: dynamicData.serviceFee,
          },
          {
            key: "advantages",
            label: "ƯU ĐIỂM",
            content: dynamicData.advantages,
          },
        ]
          .filter((item) => item.content)
          .map((item) => (
            <div
              key={item.key}
              ref={sections[item.key as keyof typeof sections]}
              className="mb-4"
            >
              <h3 className="text-base font-semibold text-gray-700">
                {item.label}
              </h3>
              <p className="text-sm text-gray-600">{item.content}</p>
            </div>
          ))}

        {/* Nội dung Google Maps */}
        <div
          ref={sections.location}
          className="mt-6 rounded-lg border border-gray-300 bg-white p-8 shadow-lg"
        >
          <h2 className="mb-4 text-lg font-bold text-[#3162ad]">
            VỊ TRÍ TÒA NHÀ
          </h2>
          <div className="aspect-w-16 aspect-h-9 relative">
            <iframe
              title="Google Maps Location"
              src={googleMapsEmbedUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Nội dung so sánh */}
      {dynamicData.comparison && (
        <div
          ref={sections.comparison}
          className="mx-auto mt-6 rounded-lg border border-gray-300 bg-white p-8 shadow-lg"
        >
          <h2 className="mb-4 text-lg font-bold text-[#3162ad]">
            CÁC TUYẾN ĐƯỜNG CÙNG VĂN PHÒNG
          </h2>
          {dynamicData.comparison}
        </div>
      )}

      {/* Nội dung đánh giá */}
      {dynamicData.review && (
        <div
          ref={sections.review}
          className="mx-auto mt-6 rounded-lg border border-gray-300 bg-white p-8 shadow-lg"
        >
          <h2 className="mb-4 text-lg font-bold text-[#3162ad]">ĐÁNH GIÁ</h2>
          {dynamicData.review}
        </div>
      )}
    </div>
  );
};

export default TabContent;
