import { EnvironmentOutlined, SelectOutlined } from "@ant-design/icons";
import { Button, Carousel, Modal } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IBuilding } from "../../../interfaces";
import { IBuildingLevel } from "../../../interfaces/client";
import { ORENTATION_TRANSLATIONS } from "../../../interfaces/common/constants";
import { useAppDispatch } from "../../../redux/hook";
import { addBuilding } from "../../../redux/slices/appointmentSlice";

interface OfficeCategoryListProps {
  buildingLevel: IBuildingLevel;
}

const OfficeCategoryList: React.FC<OfficeCategoryListProps> = ({
  buildingLevel,
}) => {
  const navigate = useNavigate();
  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);

  const showScheduleModal = () => setIsScheduleModalVisible(true);
  const closeScheduleModal = () => setIsScheduleModalVisible(false);

  const handleCardClick = (buildingId: number) => {
    navigate(`/van-phong/${buildingId}`);
  };

  const dispatch = useAppDispatch();

  const handleSchedule = (buildingId: number) => {
    const selectedBuilding = buildingLevel.buildings?.find(
      (building) => building.buildingId === buildingId,
    ) as IBuilding | undefined;
    if (selectedBuilding) {
      dispatch(addBuilding(selectedBuilding));
      showScheduleModal();
    }
  };

  return (
    <>
      <div className="mx-auto my-8 w-11/12 lg:w-3/4">
        <h2 className="mb-6 text-2xl font-bold text-[#3162ad]">
          Văn phòng {buildingLevel.buildingLevelName}
        </h2>
        <Carousel
          autoplay={
            buildingLevel.buildings && buildingLevel.buildings.length > 4
          }
          dots={false}
          arrows
          slidesToShow={4}
          className="flex items-stretch"
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
        >
          {buildingLevel.buildings?.map((building) => (
            <div key={building.buildingId} className="p-2">
              <div className="flex h-full min-h-[440px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <div
                  onClick={() => handleCardClick(building.buildingId)}
                  className="flex flex-grow cursor-pointer flex-col"
                >
                  <div className="relative">
                    <img
                      src={building.buildingImages[0]?.imgUrl}
                      alt={building.buildingName}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute left-2 top-2 rounded bg-[#3162ad] px-3 py-1 text-sm font-semibold text-white">
                      {building.rentalPricing.length > 0
                        ? `${building.rentalPricing[
                            building.rentalPricing.length - 1
                          ].price.toLocaleString()} VND/m²`
                        : "Giá chưa cập nhật"}
                    </div>
                  </div>
                  <div className="flex flex-grow flex-col p-4">
                    <h3 className="text-lg font-bold text-[#3162ad]">
                      {building.buildingName}
                    </h3>
                    <p className="mt-1 text-xs text-gray-600">
                      {`${building.street}, ${building.ward}, ${building.district}, ${building.city}`}
                    </p>
                    <div className="mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <EnvironmentOutlined /> Diện tích:{" "}
                        {building.buildingUnits
                          .flatMap((unit) =>
                            unit.rentAreas.map((area) => area.area),
                          )
                          .slice(0, 3)
                          .join(", ")}
                        {building.buildingUnits.flatMap((unit) =>
                          unit.rentAreas.map((area) => area.area),
                        ).length > 3 && "..."}{" "}
                        m²
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <SelectOutlined />
                        {ORENTATION_TRANSLATIONS[building.orientation] ||
                          "Không xác định"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-center border-t border-gray-200 p-4">
                  <Button
                    type="link"
                    icon={<SelectOutlined />}
                    className="font-semibold text-[#3162ad]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSchedule(building.buildingId);
                    }}
                  >
                    Chọn đi xem
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
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
    </>
  );
};

export default OfficeCategoryList;
