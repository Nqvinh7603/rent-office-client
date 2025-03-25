import { Button, Modal } from "antd";
import React, { useState } from "react";
import { GrContact } from "react-icons/gr";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { IBuilding } from "../../../../interfaces";
import { useAppDispatch } from "../../../../redux/hook";
import { addBuilding } from "../../../../redux/slices/appointmentSlice";
import RequestFormModal from "../../../contact/components/RequestFormModal";

interface ActionBtnProps {
  building: IBuilding; // Accept the entire building object
}

const ActionBtn: React.FC<ActionBtnProps> = ({ building }) => {
  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);
  const [isRequestModalVisible, setIsRequestModalVisible] = useState(false); // State for "Tư vấn nhanh" modal

  const showScheduleModal = () => setIsScheduleModalVisible(true);
  const closeScheduleModal = () => setIsScheduleModalVisible(false);

  const showRequestModal = () => setIsRequestModalVisible(true); // Show "Tư vấn nhanh" modal
  const closeRequestModal = () => setIsRequestModalVisible(false); // Close "Tư vấn nhanh" modal

  const dispatch = useAppDispatch();
  const handleSchedule = () => {
    dispatch(addBuilding(building));
    showScheduleModal();
  };

  return (
    <>
      <div className="mt-12 flex space-x-4">
        {/* Hẹn đi xem button */}
        <Button
          type="primary"
          className="flex items-center justify-center space-x-2 rounded-lg bg-[#3162ad] px-10 py-5 text-base font-semibold text-white hover:bg-blue-700"
          onClick={handleSchedule}
        >
          <LiaBusinessTimeSolid size={28} />
          <span>Hẹn đi xem</span>
        </Button>

        {/* Tư vấn nhanh button */}
        <Button
          type="default"
          className="flex items-center justify-center space-x-2 rounded-lg border-2 border-[#3162ad] px-10 py-5 text-base font-semibold text-[#3162ad] hover:border-blue-700 hover:text-blue-700"
          onClick={showRequestModal} // Show the "Tư vấn nhanh" modal
        >
          <GrContact size={28} />
          <span>Tư vấn nhanh</span>
        </Button>
      </div>

      {/* Hẹn đi xem modal */}
      <Modal
        title={null}
        open={isScheduleModalVisible}
        onCancel={closeScheduleModal}
        footer={[
          <Button
            key="view-list"
            type="primary"
            className="mx-auto bg-[#3162ad] text-white"
            onClick={() => (window.location.href = "/chon-di-xem")}
          >
            Xem danh sách
          </Button>,
        ]}
        width={600}
      >
        <div className="text-center text-lg font-medium text-gray-700">
          Tòa nhà văn phòng đã được lưu vào danh sách hẹn đi xem thành công.
        </div>
      </Modal>

      {/* Tư vấn nhanh modal */}
      <RequestFormModal
        visible={isRequestModalVisible}
        onClose={closeRequestModal} // Close the modal when the user cancels or submits
      />
    </>
  );
};

export default ActionBtn;
