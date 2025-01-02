import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../../../common/Breadcrums";
import OfficeDetails from "./OfficeDetails";
import OfficeHeader from "./OfficeHeader";
import OfficeImages from "./OfficeImages";
import OfficeTabs from "./OfficeTabs";
import ActionBtn from "./ActionBtn";

const buildings = [
  {
    id: "1",
    name: "The Mett",
    address: "Lô 1.13, Khu đô thị Thủ Thiêm, Quận 2",
    rentPrice: "45$/m2",
    details: {
      location: "Lô 1.13, Phường Thủ Thiêm, Quận 2",
      area: "500, 800, 1000, 1600, 2300m2",
      direction: "Hướng Đông Nam",
      grade: "A",
      status: "Đang cho thuê",
      workingHours: "8h - 18h",
    },
    fees: {
      management: "7.5$/m2/tháng",
      carParking: "140$/xe/tháng",
      bikeParking: "14$/xe/tháng",
      electricity: "Theo giá nhà nước",
      airConditioning: "Đã bao gồm",
      overtime: "Thỏa Thuận",
      deposit: "3 tháng",
      payment: "Quý",
    },
    rating: 5.843,
    stars: 4.5,
    images: [
      "/src/assets/image/test.jpg",
      "/src/assets/image/banner-2.jpg",
      "/src/assets/image/banner-3.jpg",
      "/src/assets/image/test.jpg",
      "/src/assets/image/banner-2.jpg",
      "/src/assets/image/banner-3.jpg",
      "/src/assets/image/test.jpg",
      "/src/assets/image/banner-2.jpg",
      "/src/assets/image/banner-3.jpg",
      "/src/assets/image/test.jpg",
      "/src/assets/image/banner-2.jpg",
      "/src/assets/image/banner-3.jpg",
    ],
  },
];

const OfficeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImage, setCurrentImage] = useState(0);
  const building = buildings.find((building) => building.id === id);
  const navigate = useNavigate();
  if (!building) {
    return (
      <div className="text-center text-xl text-red-500">
        Tòa nhà không tồn tại.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-10 pt-0">
      <Breadcrumbs
        items={[
          { name: "TRANG CHỦ", path: "/" },
          { name: "TÒA NHÀ", path: "/van-phong" },
          { name: building.name },
        ]}
        onBack={() => navigate(-1)}
      />

      <div className="rounded-lg border bg-white p-6 shadow-lg">
        <OfficeHeader
          name={building.name}
          address={building.address}
          stars={building.stars}
          rating={building.rating}
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <OfficeImages
            images={building.images}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
          />
          <div className="lg:col-span-6">
            <OfficeDetails
              details={building.details}
              fees={building.fees}
              rentPrice={building.rentPrice}
            />

            <ActionBtn />
          </div>
        </div>
      </div>
      <OfficeTabs />
    </div>
  );
};

export default OfficeDetail;
