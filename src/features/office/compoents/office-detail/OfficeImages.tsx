import React, { useRef } from "react";
import { Button, Carousel, Image } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { CarouselRef } from "antd/lib/carousel";

interface OfficeImagesProps {
  images: string[];
  currentImage: number;
  setCurrentImage: (index: number) => void;
}

const OfficeImages: React.FC<OfficeImagesProps> = ({
  images,
  currentImage,
  setCurrentImage,
}) => {
  const carouselRef = useRef<CarouselRef | null>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
    carouselRef.current?.goTo(index);
  };

  return (
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
          {images.map((image, index) => (
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
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`h-16 w-16 cursor-pointer rounded-lg border object-cover ${
              currentImage === index ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default OfficeImages;
