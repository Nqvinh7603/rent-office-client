import React from "react";
import Banner from "../common/Banner";
import AboutContent from "../common/Footers/AboutContent";
import SearchPanel from "../features/search-building/components/SearchPanel";

const AboutPage: React.FC = () => {
  return (
    <div className="w-full">
      <Banner />
      <SearchPanel />
      <AboutContent />
    </div>
  );
};

export default AboutPage;
