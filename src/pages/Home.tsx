import React from "react";
import ContactSection from "../common/Footers/ContactSession";
import ScrollTop from "../common/ScrollTop";
import Banner from "../features/Home/components/Banner";
import OfficeList from "../features/Home/components/OfficeList";
import SearchPanel from "../features/Home/components/SearchPanel";
import WhyChooseUs from "../features/Home/components/WhyChooseUs";

const Home: React.FC = () => {
  return (
    <div className="w-full">
      <Banner />
      <SearchPanel />
      <div className="bg-white py-1">
        <WhyChooseUs />
      </div>
      <ScrollTop />
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className={index % 2 === 0 ? "bg-gray-100 py-1" : "bg-white py-1"}
          >
            <OfficeList />
          </div>
        ))}
    </div>
  );
};

export default Home;
