import React from "react";

const ScrollToTop: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={scrollToTop}
      className="fixed bottom-32 right-8 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-[#3162ad] text-white shadow-lg transition-all duration-300 hover:bg-[#274b8d] hover:shadow-xl"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </div>
  );
};

export default ScrollToTop;
