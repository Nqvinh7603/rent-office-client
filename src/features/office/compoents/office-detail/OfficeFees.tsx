import { IoMdPricetags } from "react-icons/io";

const OfficeFees: React.FC = () => {
  return (
    <div className="mt-6">
      <h3 className="mb-3 text-xl font-bold text-gray-900">Các loại phí</h3>
      <ul className="grid grid-cols-1 gap-2 space-y-3 text-gray-700 md:grid-cols-2">
        <li className="flex items-center">
          <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" />
          Phí quản lý: {fees.management}
        </li>
        <li className="flex items-center">
          <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" /> Phí ô tô:{" "}
          {fees.carParking}
        </li>
        <li className="flex items-center">
          <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" /> Phí xe máy:{" "}
          {fees.bikeParking}
        </li>
        <li className="flex items-center">
          <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" /> Tiền điện:{" "}
          {fees.electricity}
        </li>
        <li className="flex items-center">
          <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" /> Tiền điện
          lạnh: {fees.airConditioning}
        </li>
        <li className="flex items-center">
          <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" /> Phí ngoài
          giờ: {fees.overtime}
        </li>
        <li className="flex items-center">
          <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" /> Tiền đặt
          cọc: {fees.deposit}
        </li>
        <li className="flex items-center">
          <IoMdPricetags className="mr-2 text-lg text-[#3162ad]" /> Thanh toán:{" "}
          {fees.payment}
        </li>
      </ul>
    </div>
  );
};

export default OfficeFees;
