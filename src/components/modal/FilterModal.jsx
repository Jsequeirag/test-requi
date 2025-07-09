import React from "react";
import { IconButton, TextButton } from "../../components/Button/Button";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
export default function OrderDetailsModal({
  openModal = false,
  setOpenModal,
  data = [],
}) {
  return (
    <div
      className="modal fixed z-20 left-0 top-0 w-full h-full  overflow-auto backdrop-opacity-10 backdrop-invert bg-gray-950/30"
      style={{ display: openModal ? "block" : "none" }}
    >
      <div className="modal-content  pc:w-[40%] movil:w-[40%] mt-[15%] m-auto pt-1 pr-1 border bg-slate-50 w-[50%] rounded-sm">
        <div className="w-full">
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
          <div className="w-full text-center font-semibold text-lg">
            <div className="w-full text-center ">
              <h1 className="text-center">FILTRO</h1>
              <div className="flex justify-start flex-col items-start p-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="userName"
                >
                  Estado de la solicitud
                </label>
                <select
                  className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
                  name=""
                  id=""
                >
                  {" "}
                  <option>Seleccionar una opción</option>
                  <option value="FR">En curso</option>
                  <option value="DE">Finalizado</option>
                </select>{" "}
                <div className="flex w-full">
                  <div className="flex flex-col flex-1 items-start mr-2">
                    <label
                      className="block text-black text-lg font-bold mb-2 mt-2"
                      htmlFor="userName"
                    >
                      Fecha inicio
                    </label>
                    <input
                      className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
                      id="name"
                      type="date"
                      name="name"
                      onChange={() => {}}
                      /* required*/
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex flex-col flex-1 items-start ml-2">
                    <label
                      className="block text-black text-lg font-bold mb-2 mt-2"
                      htmlFor="userName"
                    >
                      Fecha final
                    </label>
                    <input
                      className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input flex-1"
                      id="name"
                      type="date"
                      name="name"
                      onChange={() => {}}
                      /* required*/
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="w-full flex justify-center items-center  py-4">
                  <TextButton
                    onClick={() => {
                      navigate("/home");
                    }}
                    text={"Confirmar"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
