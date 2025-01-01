import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Button, Carousel, Image, Rate } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import { useEffect, useRef, useState } from "react";
import { FaRegStar, FaToggleOn } from "react-icons/fa";
import { GrContact } from "react-icons/gr";
import { IoMdPricetags } from "react-icons/io";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { PiMoney } from "react-icons/pi";
import { TbLocation } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import NavTabs from "./NavTabs";

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
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const carouselRef = useRef<CarouselRef | null>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const building = buildings.find((building) => building.id === id);

  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const thumbnailWidth = 72;
      const scrollPosition = currentImage * thumbnailWidth - thumbnailWidth * 2;
      thumbnailContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentImage, setCurrentImage]);

  if (!building) {
    return (
      <div className="text-center text-xl text-red-500">
        Tòa nhà không tồn tại.
      </div>
    );
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
    carouselRef.current?.goTo(index);
  };
  return (
    <div className="container mx-auto px-4 pb-10 pt-0">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center space-x-2 text-gray-500">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          className="flex items-center text-gray-700 hover:text-black"
          onClick={() => navigate("/van-phong")}
        />
        <span className="text-sm font-medium uppercase">
          <span
            className="cursor-pointer text-black hover:text-gray-700"
            onClick={() => navigate("/")}
          >
            TRANG CHỦ
          </span>{" "}
          /{" "}
          <span
            className="cursor-pointer hover:text-gray-700"
            onClick={() => navigate("/van-phong")}
          >
            TÒA NHÀ
          </span>{" "}
          / <span className="text-gray-400">{building.name}</span>
        </span>
      </div>

      {/* Nội dung chính */}
      <div className="rounded-lg border bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {building.name}
            </h1>
            <p className="text-gray-500">{building.address}</p>
          </div>
          <div className="mt-4 flex items-center lg:mt-0">
            <Rate
              allowHalf
              defaultValue={building.stars}
              disabled
              className="text-yellow-500"
            />
            <span className="ml-2 text-sm text-gray-500">
              {building.rating} đánh giá
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Image */}
          <div className="lg:col-span-6">
            <div className="relative">
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow hover:bg-gray-100"
                onClick={() => carouselRef.current?.prev()}
              />
              <Carousel
                ref={carouselRef}
                afterChange={setCurrentImage}
                dots={false}
                className="overflow-hidden rounded-lg"
              >
                {building.images.map((image, index) => (
                  <div key={index} className="cursor-pointer">
                    <Image
                      src={image}
                      alt={`Hình ảnh ${index + 1}`}
                      className="h-80 w-full object-cover"
                      preview={true}
                    />
                  </div>
                ))}
              </Carousel>
              <Button
                type="text"
                icon={<ArrowRightOutlined />}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow hover:bg-gray-100"
                onClick={() => carouselRef.current?.next()}
              />
            </div>
            <div
              ref={thumbnailContainerRef}
              className="scrollbar-hide mt-4 flex space-x-2 overflow-x-auto"
            >
              {building.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`h-16 w-16 cursor-pointer rounded-lg border object-cover ${
                    currentImage === index
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>

          {/* Info detail */}
          <div className="lg:col-span-6">
            <div className="mb-4 flex items-center">
              <PiMoney
                className="mr-3 text-xl font-bold text-red-500"
                size={38}
              />
              <h2 className="text-xl font-bold text-red-500">
                Giá thuê từ: {building.rentPrice}
              </h2>
            </div>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <EnvironmentOutlined className="mr-3 text-lg text-[#3162ad]" />
                <span className="font-semibold">Vị trí</span>:{" "}
                {building.details.location}
              </li>
              <li className="flex items-center">
                <DollarCircleOutlined className="mr-3 text-lg text-[#3162ad]" />
                <span className="font-semibold">Diện tích</span>:{" "}
                {building.details.area}
              </li>
              <li className="flex items-center">
                <TbLocation className="mr-3 text-lg text-[#3162ad]" />
                <span className="font-semibold">Hướng</span>:{" "}
                {building.details.direction}
              </li>
              <li className="flex items-center">
                <FaRegStar className="mr-3 text-lg text-[#3162ad]" />
                <span className="font-semibold">Xếp Hạng</span>:{" "}
                {building.details.grade}
              </li>
              <li className="flex items-center">
                <FaToggleOn className="mr-3 text-lg text-[#3162ad]" />
                <span className="font-semibold">Tình trạng</span>:{" "}
                {building.details.status}
              </li>
              <li className="flex items-center">
                <ClockCircleOutlined className="mr-3 text-lg text-[#3162ad]" />
                <span className="font-semibold">Giờ làm việc</span>:{" "}
                {building.details.workingHours}
              </li>
            </ul>

            {/* Fees */}
            <div className="mt-6">
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Các loại phí
              </h3>
              <ul className="grid grid-cols-1 gap-2 space-y-3 text-gray-700 md:grid-cols-2">
                <li className="flex items-center">
                  <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" />
                  Phí quản lý: {building.fees.management}
                </li>
                <li className="flex items-center">
                  <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" /> Phí
                  ô tô: {building.fees.carParking}
                </li>
                <li className="flex items-center">
                  <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" /> Phí
                  xe máy: {building.fees.bikeParking}
                </li>
                <li className="flex items-center">
                  <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" /> Tiền
                  điện: {building.fees.electricity}
                </li>
                <li className="flex items-center">
                  <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" /> Tiền
                  điện lạnh: {building.fees.airConditioning}
                </li>
                <li className="flex items-center">
                  <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" /> Phí
                  ngoài giờ: {building.fees.overtime}
                </li>
                <li className="flex items-center">
                  <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" /> Tiền
                  đặt cọc: {building.fees.deposit}
                </li>
                <li className="flex items-center">
                  <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" />{" "}
                  Thanh toán: {building.fees.payment}
                </li>
              </ul>
            </div>

            {/* Action button */}
            <div className="mt-12 flex space-x-4">
              <Button
                type="primary"
                className="flex items-center justify-center space-x-2 rounded-lg bg-[#3162ad] px-10 py-5 text-base font-semibold text-white hover:bg-blue-700"
              >
                <LiaBusinessTimeSolid size={28} />
                <span>Chọn đi xem</span>
              </Button>
              <Button
                type="default"
                className="flex items-center justify-center space-x-2 rounded-lg border-2 border-[#3162ad] px-10 py-5 text-base font-semibold text-[#3162ad] hover:border-blue-700 hover:text-blue-700"
              >
                <GrContact size={28} />
                <span>Tư vấn nhanh</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <NavTabs />
    </div>
  );
};

export default OfficeDetail;
