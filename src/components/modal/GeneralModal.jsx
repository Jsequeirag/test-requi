import { IconButton, TextButton } from "../../components/Button/Button";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import RDetailMovimientoLateral from "../../pages/NewRequisition/RequisitionDetail/RDetailMovimientoLateral";
export default function GeneralModal({
  openModal = false,
  setOpenModal,
  childrenComponent,
  pcWidth = "50%",
  movilWidth = "50%",
}) {
  return (
    //bg gray locked

    <div
      className={`modal fixed z-20 left-0 top-0 w-full h-full  overflow-auto backdrop-opacity-10 backdrop-invert bg-gray-950/30`}
      style={{ display: openModal ? "block" : "none" }}
    >
      <div
        className={`modal-content  pc:w-[${movilWidth}] movil:w-[${pcWidth}] mt-[10%] m-auto pt-1 pr-1 border bg-slate-50 rounded-sm`}
      >
        <div className="flex justify-end items-end">
          <div className="text-center ">
            <IconButton
              bgColor={`bg-red-500`}
              hoverBgColor={`hover:bg-red-500 `}
              hoverTextColor={`hover:text-black`}
              otherProperties="w-auto "
              icon={faCircleXmark}
              onClick={() => setOpenModal(false)}
            />
          </div>
        </div>
        <div className={`w-full`}>{childrenComponent}</div>
      </div>
    </div>
  );
}
