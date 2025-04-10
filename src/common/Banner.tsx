import { Carousel } from "antd";
import React from "react";

const Banner: React.FC = () => {
  const images = [
    "/src/assets/image/banner-1.jpg",
    "/src/assets/image/banner-2.jpg",
    "/src/assets/image/banner-3.jpg",
  ];

  return (
    <div className="relative w-full">
      <Carousel autoplay arrows className="rounded-md shadow-lg">
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`slide-${index}`}
              className="h-[400px] w-full object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
