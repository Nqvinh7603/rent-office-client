import { SelectOutlined } from "@ant-design/icons";
import { Button, Modal, Pagination, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { PiMapPinSimpleArea } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Breadcrumbs from "../../../common/Breadcrums";
import { useGetProvinces } from "../../../hooks";
import { IBuilding } from "../../../interfaces";
import { ORENTATION_TRANSLATIONS } from "../../../interfaces/common/constants";
import { Orientation } from "../../../interfaces/common/enums";
import { useAppDispatch } from "../../../redux/hook";
import { addBuilding } from "../../../redux/slices/appointmentSlice";
import { RootState } from "../../../redux/store";
import { buildingService } from "../../../services/building/building-service";

const OfficeList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [buildings, setBuildings] = useState<IBuilding[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
  const currentPage = Math.max(Number(searchParams.get("page")) || 1, 1);
  const itemsPerPage = Math.max(Number(searchParams.get("pageSize")) || 10, 1);
  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);

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
  const buildingLevel = searchParams.get("buildingLevel");
  const district = searchParams.get("district");
  const ward = searchParams.get("ward");
  const orientation = searchParams.get("orientation");
  const street = searchParams.get("street");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const minArea = searchParams.get("minArea");
  const maxArea = searchParams.get("maxArea");
  const fetchBuildings = async () => {
    setIsLoading(true);
    try {
      const response = await buildingService.getBuildingCompanys(
        { page: currentPage, pageSize: itemsPerPage },
        {
          ...(city ? { city: city } : {}),
          ...(buildingLevel ? { buildingLevel: buildingLevel } : {}),
          ...(district ? { district: district } : {}),
          ...(ward ? { ward: ward } : {}),
          ...(orientation ? { orientation: orientation as Orientation } : {}),
          ...(street ? { street: street } : {}),
          ...(minPrice ? { minPrice: Number(minPrice) } : {}),
          ...(maxPrice ? { maxPrice: Number(maxPrice) } : {}),
          ...(minArea ? { minArea: Number(minArea) } : {}),
          ...(maxArea ? { maxArea: Number(maxArea) } : {}),
        },
      );
      const { content, meta } = response.payload || {};
      setBuildings(content || []);
      setTotalItems(meta?.total || 0);
    } catch (error) {
      console.error("Failed to fetch buildings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, [currentPage, itemsPerPage, selectedRegion]);

  useEffect(() => {
    fetchBuildings();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (page: number, pageSize?: number) => {
    searchParams.set("page", String(page));
    searchParams.set("pageSize", String(pageSize || itemsPerPage));
    setSearchParams(searchParams);
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
        <Breadcrumbs
          items={[
            { name: "TRANG CHỦ", path: "/" },
            //{ name: "TÒA NHÀ", path: "" },
            ...(city
              ? [
                  {
                    name: `TOÀ NHÀ ${city.toUpperCase()}${
                      district ? ` - ${district.toUpperCase()}` : ""
                    }${buildingLevel ? ` - HẠNG ${buildingLevel}` : ""}`,
                    path: "",
                  },
                ]
              : []),
          ]}
          onBack={() => navigate("/")}
        />
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          Danh sách toà nhà
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {buildings.length > 0 ? (
            buildings.map((building) => (
              <div
                key={building.buildingId}
                className="flex h-full cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-lg"
                onClick={() => handleCardClick(building.buildingId)}
              >
                <div className="relative">
                  <img
                    src={building.buildingImages?.[0]?.imgUrl}
                    alt={building.buildingName}
                    className="h-48 w-full object-cover"
                  />
                  <div className="absolute left-2 top-2 rounded bg-[#3162ad] px-3 py-1 text-sm font-semibold text-white">
                    {(() => {
                      if (
                        !building?.buildingUnits ||
                        building.buildingUnits.length === 0
                      ) {
                        return "Giá chưa cập nhật";
                      }

                      const latestPrices = building.buildingUnits
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
                <div className="flex-grow p-4">
                  <h3 className="text-lg font-bold text-[#3162ad]">
                    {building.buildingName}
                  </h3>
                  <p className="mt-1 text-xs text-gray-600">
                    {`${building.street}, ${building.ward}, ${building.district}, ${building.city}`}
                  </p>
                  <div className="mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <PiMapPinSimpleArea size={17} />
                      Diện tích:{" "}
                      {[
                        ...new Set(
                          building.buildingUnits.flatMap((unit) =>
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
                      {ORENTATION_TRANSLATIONS[building.orientation] ||
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
                      handleSchedule(building.buildingId);
                    }}
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
            pageSizeOptions={[5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            current={currentPage}
            total={totalItems}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            showSizeChanger
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

export default OfficeList;
