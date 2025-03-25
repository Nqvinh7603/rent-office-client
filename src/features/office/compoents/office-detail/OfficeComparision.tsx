import { EnvironmentOutlined, SelectOutlined } from "@ant-design/icons";
import { Button, Pagination, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { IBuilding } from "../../../../interfaces";
import { buildingService } from "../../../../services/building/building-service";

interface OfficeComparisionProps {
  street: string;
  buildingId?: number;
}

const OfficeComparision: React.FC<OfficeComparisionProps> = ({
  street,
  buildingId,
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
        { street },
      );
      const { content, meta } = response.payload || {};
      const filteredBuildings = (content || []).filter(
        (building) => building.buildingId !== buildingId,
      );
      setBuildings(filteredBuildings);
      setTotalItems(meta?.total ? meta.total - 1 : 0);
    } catch (error) {
      console.error("Failed to fetch buildings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, [currentPage, street]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-10 pt-0">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {buildings.length > 0 ? (
          buildings.map((office) => (
            <div
              key={office.buildingId}
              className="overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <div className="relative">
                <img
                  src={office.buildingImages?.[0]?.imgUrl || "/placeholder.jpg"}
                  alt={office.buildingName}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute left-2 top-2 rounded bg-[#3162ad] px-3 py-1 text-sm font-semibold text-white">
                  {(() => {
                    if (
                      !office?.buildingUnits ||
                      office.buildingUnits.length === 0
                    ) {
                      return "Giá chưa cập nhật";
                    }

                    const latestPrices = office.buildingUnits
                      .map((unit) => {
                        if (
                          !unit?.rentalPricing ||
                          unit.rentalPricing.length === 0
                        ) {
                          return null;
                        }

                        const latestPricing = unit.rentalPricing.reduce(
                          (latest, pricing) => {
                            if (
                              !latest ||
                              new Date(pricing.createdAt) >
                                new Date(latest.createdAt)
                            ) {
                              return pricing;
                            }
                            return latest;
                          },
                          unit.rentalPricing[0],
                        );

                        return latestPricing ? latestPricing.price : null;
                      })
                      .filter((price) => price !== null);

                    if (latestPrices.length === 0) {
                      return "Giá chưa cập nhật";
                    }

                    const minPrice = Math.min(...latestPrices);
                    return `${minPrice.toLocaleString()} VND/m²`;
                  })()}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-[#3162ad]">
                  {office.buildingName}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {`${office.street}, ${office.ward}, ${office.district}, ${office.city}`}
                </p>
                <div className="mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <EnvironmentOutlined />
                    {/* {office.sizes || "Không xác định"} */}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <SelectOutlined />
                    {/* {office.direction || "Không xác định"} */}
                  </div>
                </div>
              </div>
              <div className="border-t p-4">
                <Button
                  type="link"
                  icon={<SelectOutlined />}
                  className="font-semibold text-[#3162ad]"
                >
                  Chọn đi xem
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            Không có tòa nhà nào!
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
          className="flex items-center justify-center gap-2 text-gray-500"
        />
      </div>
    </div>
  );
};

export default OfficeComparision;
