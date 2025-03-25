import React, { useRef } from "react";
import OfficeComparision from "./OfficeComparision";
import ReviewSection from "./RevewSection";
import TabContent from "./TabContent";

interface OfficeTabsProps {
  street: string;
  buildingId?: number;
}

const OfficeTabs: React.FC<OfficeTabsProps> = ({ street, buildingId }) => {
  // Create refs for each section
  const sections = {
    generalInfo: useRef<HTMLDivElement>(null),
    location: useRef<HTMLDivElement>(null),
    structure: useRef<HTMLDivElement>(null),
    serviceFee: useRef<HTMLDivElement>(null),
    advantages: useRef<HTMLDivElement>(null),
    comparison: useRef<HTMLDivElement>(null),
    review: useRef<HTMLDivElement>(null),
  };

  const dynamicData = {
    generalInfo: "Thông tin chung",
    location: "Vị trí",
    structure: "Cấu trúc",
    serviceFee: "Phí dịch vụ",
    advantages: "Ưu điểm",
    comparison: <OfficeComparision street={street} buildingId={buildingId} />, // Pass street to OfficeComparision
    review: <ReviewSection />,
  };

  return (
    <div className="mt-6">
      <TabContent
        dynamicData={dynamicData}
        sections={sections}
        street={street}
        buildingId={buildingId}
      />
    </div>
  );
};

export default OfficeTabs;
