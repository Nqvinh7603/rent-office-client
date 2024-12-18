import React from "react";
import Banner from "../common/Banner";
import WhyChooseUs from "../common/WhyChooseUs";
import NewsSection from "../features/news/components/NewsSection";
import OfficeList from "../features/office/compoents/OfficeList";
import SearchPanel from "../features/search-building/components/SearchPanel";

const Home: React.FC = () => {
  return (
    <div className="w-full">
      <Banner />
      <SearchPanel />
      <div className="bg-white py-1">
        <WhyChooseUs />
      </div>

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

      <div className="bg-white py-1">
        <NewsSection />
      </div>
    </div>
  );
};

export default Home;
