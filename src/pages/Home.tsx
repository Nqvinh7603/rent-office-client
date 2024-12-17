import React from "react";
import ContactSection from "../common/ContactSession";
import ScrollTop from "../common/ScrollTop";
import Banner from "../components/Home/Banner";
import OfficeList from "../components/Home/OfficeList";
import SearchPanel from "../components/Home/SearchPanel";
import WhyChooseUs from "../components/Home/WhyChooseUs";

const Home: React.FC = () => {
  return (
    <div className="w-full">
      <Banner />
      <SearchPanel />
      {/* </div> */}
      <div className="bg-white py-1">
        <WhyChooseUs />
      </div>
      <ScrollTop />
      <div className="bg-gray-100 py-1">
        <OfficeList />
      </div>
      <div className="bg-white py-1">
        <OfficeList />
      </div>
      <div className="bg-gray-100 py-1">
        <OfficeList />
      </div>
      <ContactSection />
    </div>
  );
};

export default Home;
