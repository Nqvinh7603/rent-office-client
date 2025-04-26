import React from "react";

interface OfficeHeaderProps {
  name: string;
  address: string;
  stars: number;
  rating: number;
}

const OfficeHeader: React.FC<OfficeHeaderProps> = ({
  name,
  address,
  stars,
  rating,
}) => {
  return (
    <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">{name}</h1>
        <p className="text-gray-500">{address}</p>
      </div>
      {/* <div className="mt-4 flex items-center lg:mt-0">
        <Rate
          allowHalf
          defaultValue={stars}
          disabled
          className="text-yellow-500"
        />
        <span className="ml-2 text-sm text-gray-500">{rating} đánh giá</span>
      </div> */}
    </div>
  );
};

export default OfficeHeader;
