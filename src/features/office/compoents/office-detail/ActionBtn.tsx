import { Button, Modal } from "antd";
import React, { useState } from "react";
import { GrContact } from "react-icons/gr";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { IBuilding } from "../../../../interfaces";
import { useAppDispatch } from "../../../../redux/hook";
import { addBuilding } from "../../../../redux/slices/appointmentSlice";

interface ActionBtnProps {
  building: IBuilding; // Accept the entire building object
}

const ActionBtn: React.FC<ActionBtnProps> = ({ building }) => {
  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);

  const showScheduleModal = () => setIsScheduleModalVisible(true);
  const closeScheduleModal = () => setIsScheduleModalVisible(false);
  const dispatch = useAppDispatch();
  const handleSchedule = () => {
    dispatch(addBuilding(building));
    showScheduleModal();
  };

  return (
    <>
      <div className="mt-12 flex space-x-4">
        <Button
          type="primary"
          className="flex items-center justify-center space-x-2 rounded-lg bg-[#3162ad] px-10 py-5 text-base font-semibold text-white hover:bg-blue-700"
          onClick={handleSchedule}
        >
          <LiaBusinessTimeSolid size={28} />
          <span>Hẹn đi xem</span>
        </Button>

        <Button
          type="default"
          className="flex items-center justify-center space-x-2 rounded-lg border-2 border-[#3162ad] px-10 py-5 text-base font-semibold text-[#3162ad] hover:border-blue-700 hover:text-blue-700"
        >
          <GrContact size={28} />
          <span>Tư vấn nhanh</span>
        </Button>
      </div>

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
    </>
  );
};

export default ActionBtn;
