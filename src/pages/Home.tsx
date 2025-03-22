import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Banner from "../common/Banner";
import WhyChooseUs from "../common/WhyChooseUs";
import NewsSection from "../features/news/components/NewsSection";
import OfficeCategoryList from "../features/office/compoents/OfficeCategoryList";
import SearchPanel from "../features/search-building/components/SearchPanel";
import { useGetProvinces } from "../hooks";
import { RootState } from "../redux/store";
import { buildingLevelService } from "../services/building/building-level-service";

const Home: React.FC = () => {
  const selectedRegion = useSelector(
    (state: RootState) => state.region.selectedRegion,
  );
  const { provinces } = useGetProvinces();
  const city =
    selectedRegion &&
    provinces?.find((province) => province.code === Number(selectedRegion))
      ?.name
      ? provinces?.find((province) => province.code === Number(selectedRegion))
          ?.name
      : "";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["buildingLevels", city],
    queryFn: () => buildingLevelService.getAllBuildingLevelClient(""),
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.
      </div>
    );
  }

  const buildingLevels = data?.payload || [];

  return (
    <div className="w-full">
      <Banner />
      <SearchPanel />
      <div className="bg-white py-1">
        <WhyChooseUs />
      </div>

      {buildingLevels
        .sort((a, b) => {
          if (a.buildingLevelCode === "A") return -1;
          if (b.buildingLevelCode === "A") return 1;
          return 0;
        })
        .map((level, index) => (
          <div
            key={level.buildingLevelId}
            className={index % 2 === 0 ? "bg-gray-100 py-1" : "bg-white py-1"}
          >
            <OfficeCategoryList buildingLevel={level} />
          </div>
        ))}

      <div className="bg-white py-1">
        <NewsSection />
      </div>
    </div>
  );
};

export default Home;
