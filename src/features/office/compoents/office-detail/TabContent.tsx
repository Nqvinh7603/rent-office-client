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
  return (
    <div className="mt-6">
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
