import React, { useState } from "react";
import { IBuilding } from "../../../../interfaces";
import { buildingService } from "../../../../services/building/building-service";

interface TabContentProps {
  dynamicData: {
    comparison: React.ReactNode;
    //review: React.ReactNode;
  };
  sections: {
    comparison: React.RefObject<HTMLDivElement>;
    // review: React.RefObject<HTMLDivElement>;
  };
  street?: string;
  buildingId?: number;
  city?: string;
  district?: string;
}

const TabContent: React.FC<TabContentProps> = ({
  dynamicData,
  sections,
  street,
  buildingId,
  city,
  district,
}) => {
  const [buildings, setBuildings] = useState<IBuilding[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const fetchBuildings = async () => {
    setIsLoading(true);
    try {
      const response = await buildingService.getBuildingCompanys(
        { page: currentPage, pageSize: itemsPerPage },
        {
          ...(street ? { street: street } : {}),
          ...(city ? { city: city } : {}),
          ...(district ? { district: district } : {}),
        },
      );
      const { content, meta } = response.payload || {};
      setBuildings(content || []);
      setTotalItems(meta?.total ? meta.total - 1 : 0);
    } catch (error) {
      console.error("Failed to fetch buildings:", error);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    fetchBuildings();
  }, [street, buildingId, city, district, currentPage]);
  return (
    <div className="mt-6">
      {/* Nội dung so sánh */}
      {buildings.length > 0 && dynamicData.comparison && (
        <div
          ref={sections.comparison}
          className="mx-auto mt-6 rounded-lg border border-gray-300 bg-white p-8 shadow-lg"
        >
          <h2 className="mb-9 text-lg font-bold text-[#3162ad]">
            CÁC VĂN PHÒNG CÙNG TUYẾN ĐƯỜNG{" "}
            {street?.toUpperCase() || "KHÔNG XÁC ĐỊNH"}
          </h2>
          {dynamicData.comparison}
        </div>
      )}

      {/* Nội dung đánh giá
      {dynamicData.review && (
        <div
          ref={sections.review}
          className="mx-auto mt-6 rounded-lg border border-gray-300 bg-white p-8 shadow-lg"
        >
          <h2 className="mb-4 text-lg font-bold text-[#3162ad]">ĐÁNH GIÁ</h2>
          {dynamicData.review}
        </div>
      )} */}
    </div>
  );
};

export default TabContent;
