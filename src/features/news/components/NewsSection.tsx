import { Carousel } from "antd";
import React from "react";

const newsData = [
  {
    id: 1,
    title: "Top văn phòng ưa thích trên đường Phạm Ngọc Thạch tại quận 3",
    description:
      "Phạm Ngọc Thạch là tuyến đường huyết mạch, nơi tập trung rất nhiều tòa cao ốc văn phòng lớn, hiện đại.",
    image: "/src/assets/image/news-1.jpg",
  },
  {
    id: 2,
    title: "Lợi ích khi thuê văn phòng tại tòa nhà hạng B",
    description:
      "Các tòa nhà văn phòng hạng B đem lại không gian làm việc thoải mái với mức chi phí hợp lý và tiện ích đầy đủ.",
    image: "/src/assets/image/news-2.jpg",
  },
];

const NewsSection: React.FC = () => {
  return (
    <div className="mx-auto my-8 w-11/12 lg:w-3/4">
      <h2 className="mb-6 text-2xl font-bold text-[#3162ad]">
        Tin tức <span className="text-gray-700">mới nhất</span>
      </h2>
      <Carousel autoplay dots={false} arrows slidesToShow={2}>
        {newsData.map((news) => (
          <div key={news.id} className="p-2">
            {/* Card */}
            <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
              {/* Image */}
              <div className="h-52 w-full">
                <img
                  src={news.image}
                  alt={news.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-grow flex-col p-4">
                <h3 className="mb-2 text-lg font-bold text-[#3162ad]">
                  {news.title}
                </h3>
                <p className="flex-grow text-sm text-gray-600">
                  {news.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default NewsSection;
