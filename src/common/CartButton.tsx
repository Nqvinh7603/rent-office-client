import { ShoppingCartOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

const CartButton: React.FC = () => {
  const navigate = useNavigate();
  const cartCount = useAppSelector(
    (state) => state.appointment.buildings.length,
  ); // Get the count of selected buildings

  const handleCartClick = () => {
    navigate("/chon-di-xem");
  };

  return (
    <div className="fixed bottom-24 right-4 z-50 flex items-center justify-center">
      <div
        className="relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-[#3162ad] text-white shadow-lg transition-all duration-300 hover:bg-[#274b8d] hover:shadow-xl"
        onClick={handleCartClick}
      >
        <ShoppingCartOutlined className="text-2xl" />
        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm font-semibold text-white">
          {cartCount}
        </span>
      </div>
    </div>
  );
};

export default CartButton;
