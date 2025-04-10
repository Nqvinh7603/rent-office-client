import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../../../common/Breadcrums";
import { ORENTATION_TRANSLATIONS } from "../../../../interfaces/common/constants";
import { buildingService } from "../../../../services/building/building-service";
import ActionBtn from "./ActionBtn";
import OfficeDetails from "./OfficeDetails";
import OfficeHeader from "./OfficeHeader";
import OfficeImages from "./OfficeImages";
import OfficeTabs from "./OfficeTabs";

const OfficeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["buildingDetail", id],
    queryFn: () => buildingService.getBuildingById(Number(id)),
    enabled: !!id, // Only fetch if `id` exists
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !data?.payload) {
    return (
      <div className="text-center text-xl text-red-500">
        Tòa nhà không tồn tại.
      </div>
    );
  }

  const building = data.payload;

  const feesAndPolicies = [
    ...(building.fees
      ?.map((fee) => {
        const value = fee.feePricing?.[fee.feePricing.length - 1]?.priceValue
          ? `${fee.feePricing[fee.feePricing.length - 1].priceValue?.toLocaleString()} ${fee.feePricing[fee.feePricing.length - 1].priceUnit}`
          : fee.feePricing?.[fee.feePricing.length - 1]?.description;

        if (!value) return null;

        return {
          label: String(fee.feeType?.feeTypeName || "Không xác định"),
          value,
        };
      })
      .filter((item): item is NonNullable<typeof item> => !!item) || []),
    ...(building.paymentPolicies
      ?.map((policy) => [
        policy.depositTerm
          ? {
              label: "Tiền đặt cọc",
              value: `${policy.depositTerm} tháng`,
            }
          : null,
        policy.paymentCycle
          ? {
              label: "Thanh toán",
              value: `${policy.paymentCycle}`,
            }
          : null,
      ])
      .flat()
      .filter((item): item is NonNullable<typeof item> => !!item) || []),
  ];
  return (
    <div className="container mx-auto px-4 pb-10 pt-0">
      <Breadcrumbs
        items={[
          { name: "TRANG CHỦ", path: "/" },
          { name: "TÒA NHÀ", path: "/van-phong" },
          { name: building.buildingName },
        ]}
        onBack={() => navigate(-1)}
      />

      <div className="rounded-lg border bg-white p-6 shadow-lg">
        <OfficeHeader
          name={building.buildingName}
          address={`${building.buildingNumber} ${building.street}, ${building.ward}, ${building.district}, ${building.city}`}
          stars={0}
          rating={0}
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <OfficeImages
            images={building.buildingImages
              .map((img) => img.imgUrl)
              .filter((url): url is string => !!url)}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
          />
          <div className="lg:col-span-6">
            <OfficeDetails
              details={{
                location: `${building.street}, ${building.ward}, ${building.district}, ${building.city}`,
                area:
                  Array.from(
                    new Set(
                      building.buildingUnits.flatMap((unit) =>
                        unit.rentAreas.map((area) => `${area.area}`),
                      ),
                    ),
                  )
                    .sort((a, b) => Number(a) - Number(b))
                    .join(", ") + " m²",
                direction:
                  ORENTATION_TRANSLATIONS[building.orientation] ||
                  "Chưa xác định",
                grade: building.buildingLevel?.buildingLevelName || "N/A",
              }}
              rentPrice={(() => {
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
              fees={feesAndPolicies}
            />

            <ActionBtn building={building} />
          </div>
        </div>
      </div>
      <OfficeTabs
        street={building.street}
        buildingId={building.buildingId}
        city={building.city}
        district={building.district}
      />
    </div>
  );
};

export default OfficeDetail;
