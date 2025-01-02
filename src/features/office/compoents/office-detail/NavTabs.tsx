import { Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
import { useContactRef } from "../../../../context/ContactRefContext";
import OfficeList from "../OfficeList";
import ReviewSection from "./RevewSection";

// Dữ liệu động
const dynamicData = {
  generalInfo: "GIỚI THIỆU TÒA NHÀ THE METT",
  location: "VỊ TRÍ TÒA NHÀ: LÔ 1.13, KHU ĐÔ THỊ THỦ THIÊM",
  structure: "CHI TIẾT KẾT CẤU: 500M2 - 2300M2",
  serviceFee: "PHÍ QUẢN LÝ: 7.5$/M2/THÁNG",
  fengShui: null, // Không hiển thị
  advantages: "ƯU ĐIỂM: GẦN SÔNG, CẢNH ĐẸP",
  comparison: <OfficeList />, // Component so sánh
  review: <ReviewSection />, // Component đánh giá
};

const NavTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("generalInfo");
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
        top: sectionRef.current.offsetTop - 165, // Offset cho sticky header
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
  }, []);

  // Tạo danh sách tabs từ dữ liệu động, chỉ render nếu có nội dung
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
      {/* Tabs */}
      <div ref={tabRef} className="relative">
        <nav
          className={`${isSticky && !isHidden ? "fixed top-16 z-50 shadow-lg" : "relative"}`}
          style={{
            width: isSticky && width ? `${width}px` : "auto",
            display: isHidden ? "none" : "block",
          }}
        >
          <div className="rounded-lg bg-[#3162ad]">
            <Tabs
              defaultActiveKey="generalInfo"
              onChange={(key) => {
                setActiveTab(key);
                scrollToSection(key);
              }}
              centered
              items={tabs.map((tab) => ({
                key: tab.key,
                label: (
                  <div
                    className={`px-6 py-1 text-xs font-bold ${
                      tab.key === activeTab
                        ? "rounded bg-white text-[#3162ad]"
                        : "text-white transition-all hover:bg-white hover:text-[#3162ad]"
                    }`}
                  >
                    {tab.label}
                  </div>
                ),
              }))}
              tabBarStyle={{
                border: "none",
                height: "45px",
              }}
            />
          </div>
        </nav>
      </div>

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
      </div>

      {/* Nội dung so sánh */}
      {dynamicData.comparison && (
        <div
          ref={sections.comparison}
          className="mx-auto mt-6 rounded-lg border border-gray-300 bg-white p-8 shadow-lg"
        >
          <h2 className="mb-4 text-lg font-bold text-[#3162ad]">SO SÁNH</h2>
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

export default NavTabs;
