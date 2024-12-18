import { ShoppingCartOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartButton: React.FC = () => {
  const [cartCount] = useState(0);
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/chon-di-xem"); // Điều hướng đến trang giỏ hàng
  };

  return (
    <div className="fixed bottom-28 right-8 z-50 flex items-center justify-center">
      <div
        className="relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-[#3162ad] text-white shadow-lg transition-all duration-300 hover:bg-[#274b8d] hover:shadow-xl"
        onClick={handleCartClick}
      >
        {/* Icon Giỏ Hàng */}
        <ShoppingCartOutlined className="text-2xl" />

        {/* Badge Số Lượng */}
        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm font-semibold text-white">
          {cartCount}
        </span>
      </div>
    </div>
  );
};

export default CartButton;
