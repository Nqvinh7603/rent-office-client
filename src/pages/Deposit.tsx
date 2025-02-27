import React from "react";
import DepositForm from "../features/deposit/components/DepositForm";

const Deposit: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto py-8">
        <DepositForm />
      </div>
    </div>
  );
};

export default Deposit;
