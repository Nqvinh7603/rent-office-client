import { SelectOutlined } from "@ant-design/icons";
import { Button, Modal, Pagination, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { PiMapPinSimpleArea } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { IBuilding } from "../../../../interfaces";
import { ORENTATION_TRANSLATIONS } from "../../../../interfaces/common/constants";
import { useAppDispatch } from "../../../../redux/hook";
import { addBuilding } from "../../../../redux/slices/appointmentSlice";
import { buildingService } from "../../../../services/building/building-service";

interface OfficeComparisionProps {
  street: string;
  buildingId?: number;
  city?: string;
  district?: string;
}

const OfficeComparision: React.FC<OfficeComparisionProps> = ({
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
  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);
  const navigate = useNavigate();
  const showScheduleModal = () => setIsScheduleModalVisible(true);
  const closeScheduleModal = () => setIsScheduleModalVisible(false);
  const dispatch = useAppDispatch();
  const handleSchedule = (buildingId: number) => {
    const selectedBuilding = buildings?.find(
      (building) => building.buildingId === buildingId,
    ) as IBuilding | undefined;
    if (selectedBuilding) {
      dispatch(addBuilding(selectedBuilding));
      showScheduleModal();
    }
  };
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
      console.log("Raw response:", response);
      console.log("Buildings:", content);
      const filteredBuildings = (content || []).filter(
        (building) => building.buildingId !== buildingId,
      );
      console.log("Filtered buildings:", filteredBuildings);
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
  }, [currentPage, street, city, district]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCardClick = (buildingId: number) => {
    navigate(`/van-phong/${buildingId}`); // Navigate to the building detail page
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 pb-10 pt-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {buildings.length > 0 ? (
            buildings.map((office) => (
              <div
                key={office.buildingId}
                className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg"
                onClick={() => handleCardClick(office.buildingId)}
              >
                <div className="relative">
                  <img
                    src={
                      office.buildingImages?.[0]?.imgUrl || "/placeholder.jpg"
                    }
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
                  <p className="mt-1 text-xs text-gray-600">
                    {`${office.street}, ${office.ward}, ${office.district}, ${office.city}`}
                  </p>
                  <div className="mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <PiMapPinSimpleArea size={17} />
                      Diện tích:{" "}
                      {[
                        ...new Set(
                          office.buildingUnits.flatMap((unit) =>
                            unit.rentAreas.map((area) => area.area),
                          ),
                        ),
                      ]
                        .sort((a, b) => a - b)
                        .join(", ")}{" "}
                      m²
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <SelectOutlined />
                      Hướng:{" "}
                      {ORENTATION_TRANSLATIONS[office.orientation] ||
                        "Không xác định"}
                    </div>
                  </div>
                </div>
                <div className="border-t p-4">
                  <Button
                    type="link"
                    icon={<SelectOutlined />}
                    className="font-semibold text-[#3162ad]"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      handleSchedule(office.buildingId);
                    }}
                  >
                    Chọn đi xem
                  </Button>
                  ,
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
      <Modal
        title={null}
        open={isScheduleModalVisible}
        onCancel={closeScheduleModal}
        footer={[
          <Button
            key="view-list"
            type="primary"
            className="mx-auto bg-[#3162ad] text-white"
            onClick={() => (window.location.href = "/chon-di-xem")}
          >
            Xem danh sách
          </Button>,
        ]}
        width={600}
      >
        <div className="text-center text-lg font-medium text-gray-700">
          Tòa nhà văn phòng đã được lưu vào danh sách hẹn đi xem thành công.
        </div>
      </Modal>
      <Modal
        title={null}
        open={isScheduleModalVisible}
        onCancel={closeScheduleModal}
        footer={[
          <Button
            key="view-list"
            type="primary"
            className="mx-auto bg-[#3162ad] text-white"
            onClick={() => (window.location.href = "/chon-di-xem")}
          >
            Xem danh sách
          </Button>,
        ]}
        width={600}
      >
        <div className="text-center text-lg font-medium text-gray-700">
          Tòa nhà văn phòng đã được lưu vào danh sách hẹn đi xem thành công.
        </div>
      </Modal>
    </>
  );
};

export default OfficeComparision;
