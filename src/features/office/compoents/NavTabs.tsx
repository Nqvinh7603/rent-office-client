import { Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
import OfficeList from "./OfficeList";
import ReviewSection from "./RevewSection";

const tabs = [
  {
    key: "1",
    label: "THÔNG TIN CHUNG",
    content: <p>GIỚI THIỆU TÒA NHÀ THE METT</p>,
  },
  {
    key: "2",
    label: "VỊ TRÍ",
    content: <p>VỊ TRÍ TÒA NHÀ: LÔ 1.13, KHU ĐÔ THỊ THỦ THIÊM</p>,
  },
  {
    key: "3",
    label: "KẾT CẤU",
    content: <p>CHI TIẾT KẾT CẤU: 500M2 - 2300M2</p>,
  },
  {
    key: "4",
    label: "PHÍ DỊCH VỤ",
    content: <p>PHÍ QUẢN LÝ: 7.5$/M2/THÁNG</p>,
  },
  { key: "5", label: "PHONG THỦY", content: <p>PHONG THỦY HƯỚNG ĐÔNG NAM</p> },
  { key: "6", label: "ƯU ĐIỂM", content: <p>ƯU ĐIỂM: GẦN SÔNG, CẢNH ĐẸP</p> },
  {
    key: "8",
    label: "ĐÁNH GIÁ",
    content: <p>ĐÁNH GIÁ NGƯỜI THUÊ</p>, // Placeholder, real action is scrolling to the section.
  },
];

const NavTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [isSticky, setIsSticky] = useState(false);
  const [width, setWidth] = useState<number | null>(null);
  const tabRef = useRef<HTMLDivElement>(null);
  const reviewSectionRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!tabRef.current) return;

    const rect = tabRef.current.getBoundingClientRect();
    setIsSticky(rect.top <= 70);
  };

  const scrollToReviewSection = () => {
    if (reviewSectionRef.current) {
      window.scrollTo({
        top: reviewSectionRef.current.offsetTop - 100, // Offset for sticky header
        behavior: "smooth",
      });
    }
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    if (key === "8") {
      scrollToReviewSection();
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

  return (
    <div className="mt-6">
      {/* Tabs */}
      <div ref={tabRef} className="relative">
        <nav
          className={`${isSticky ? "fixed top-16 z-50 shadow-lg" : "relative"}`}
          style={{
            width: isSticky && width ? `${width}px` : "auto",
          }}
        >
          <div className="rounded-lg bg-[#3162ad]">
            <Tabs
              defaultActiveKey="1"
              onChange={handleTabChange}
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

      {/* Nội dung */}
      <div className="mx-auto mt-6 rounded-lg border border-gray-300 bg-white p-8 shadow-lg">
        {tabs.find((tab) => tab.key === activeTab)?.content}

        <div ref={reviewSectionRef}>
          <ReviewSection />
        </div>
      </div>
      <div className="mx-auto mt-6 rounded-lg border border-gray-300 bg-white p-8 shadow-lg">
        {tabs.find((tab) => tab.key === activeTab)?.content}

        <div ref={reviewSectionRef}>
          <OfficeList />
        </div>
      </div>
    </div>
  );
};

export default NavTabs;
