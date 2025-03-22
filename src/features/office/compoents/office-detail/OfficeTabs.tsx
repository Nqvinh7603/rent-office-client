import React, { useEffect, useRef, useState } from "react";
import { useContactRef } from "../../../../context/ContactRefContext";

import OfficeComparision from "./OfficeComparision";
import ReviewSection from "./RevewSection";
import TabContent from "./TabContent";

// Dữ liệu động
const dynamicData = {
  generalInfo: "GIỚI THIỆU TÒA NHÀ THE METT",
  location: "VỊ TRÍ TÒA NHÀ: LÔ 1.13, KHU ĐÔ THỊ THỦ THIÊM",
  structure: "CHI TIẾT KẾT CẤU: 500M2 - 2300M2",
  serviceFee: "PHÍ QUẢN LÝ: 7.5$/M2/THÁNG",
  fengShui: null,
  advantages: "ƯU ĐIỂM: GẦN SÔNG, CẢNH ĐẸP",
  comparison: <OfficeComparision />,
  review: <ReviewSection />,
};

const OfficeTabs: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [width, setWidth] = useState<number | null>(null);
  const tabRef = useRef<HTMLDivElement>(null);
  const contactRef = useContactRef();
  const sections = {
    generalInfo: useRef<HTMLDivElement>(null),
    location: useRef<HTMLDivElement>(null),
    structure: useRef<HTMLDivElement>(null),
    serviceFee: useRef<HTMLDivElement>(null),
    advantages: useRef<HTMLDivElement>(null),
    comparison: useRef<HTMLDivElement>(null),
    review: useRef<HTMLDivElement>(null),
  };

  // Xử lý scroll cho sticky
  const handleScroll = () => {
    if (!tabRef.current || !contactRef.current) return;
    const rect = tabRef.current.getBoundingClientRect();
    const contactRect = contactRef.current.getBoundingClientRect();
    setIsSticky(rect.top <= 70);
    setIsHidden(
      contactRect.top <= window.innerHeight && contactRect.bottom >= 0,
    );
  };

  // Scroll đến section
  const scrollToSection = (key: string) => {
    const sectionRef = sections[key as keyof typeof sections];
    if (sectionRef?.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop - 165,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const updateWidth = () => {
      if (tabRef.current) {
        setWidth(tabRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", updateWidth);
      window.removeEventListener("scroll", handleScroll);
    };
  });
  const tabs = [
    { key: "generalInfo", label: "THÔNG TIN CHUNG" },
    { key: "location", label: "VỊ TRÍ" },
    { key: "structure", label: "KẾT CẤU" },
    { key: "serviceFee", label: "PHÍ DỊCH VỤ" },
    { key: "advantages", label: "ƯU ĐIỂM" },
    { key: "comparison", label: "SO SÁNH" },
    { key: "review", label: "ĐÁNH GIÁ" },
  ].filter((tab) => dynamicData[tab.key as keyof typeof dynamicData]); // Lọc các mục không có nội dung

  return (
    <div className="mt-6">
      <TabContent dynamicData={dynamicData} sections={sections} />
    </div>
  );
};

export default OfficeTabs;
