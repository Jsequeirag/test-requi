import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

import TextButton from "../../components/Button/TextButton";
import { motion } from "framer-motion";
import { useApiSend } from "../../api/config/customHooks";
import { recoverPassword } from "../../api/urls/auth";
import RegisterStore from "../../../stores/RegisterStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
export default function RecoverPassword() {
  const { isPending, error, mutateAsync } = useApiSend(recoverPassword);
  //global
  const [formValues, setFormValues] = useState({});
  const [userExisted, setUserExisted] = useState();
  const registerValues = RegisterStore((state) => state.registerValues);
  const setRegisterValues = RegisterStore((state) => state.setRegisterValues);
  //router
  const navigate = useNavigate();
  //onSubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    mutateAsync(formValues)
      .then((data) => {
        if (!data?.existed) {
          setRegisterValues(data);
          navigate("/validateCode");
        }
        data?.existed && setUserExisted(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  function handleData(e) {
    setFormValues({ [e.target.name]: e.target.value });
  }
  return (
    <motion.div
      className="box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg flex flex-col justify-center items-center h-[100vh]">
        <div className="flex pc:w-[45%] movil:w-[95%]  bg-slate-50 p-1">
          <a href="/login">
            <TextButton text={"Atras"} />
          </a>
        </div>
        <div className="flex flex-row  justify-center items-center pc:w-[45%] movil:w-[95%]  bg-slate-50 rounded-sm p-5">
          <div className="flex-1 pc:flex pc:flex-col items-center justify-center h-[400px] rounded-sm  movil:hidden">
            <img
              className="pc:block movil:hidden"
              src="/assets/resourcesLogo.png"
              width="250"
              alt=""
            />
          </div>

          <form
            onSubmit={onSubmit}
            className="flex flex-col flex-1 ml-5  ctext-primary "
          >
            <div className="m-4 flex justify-center items-center flex-col"></div>
            <div className="mb-4">
              <p className="text-4xl mb-4 font-semibold">
                Recuperar contraseña
              </p>
              <div className="flex  items-center">
                {userExisted && (
                  <>
                    <div className="text-blue-500 mr-1">
                      <FontAwesomeIcon icon={faInfoCircle} size="lg" />
                    </div>
                    <p className="text-gray-500 ">
                      {userExisted && " El usuario ya está registrado"}
                    </p>
                  </>
                )}
              </div>

              <label
                className="block text-black text-lg font-bold mb-2"
                htmlFor="employeeId"
              >
                ID de empleado / Lion login
              </label>
              <p className="text-gray-700 italic">
                {error && "El usuario no existe"}
              </p>
              <input
                className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
                id="employeeId"
                type="number"
                name="employeeId"
                placeholder="Ejemplo: 741676"
                onChange={handleData}
                /* required*/
                autoComplete="off"
                required
              ></input>
            </div>

            <div className="flex items-center flex-col ">
              <div className="mb-4">
                <TextButton
                  type="submit"
                  text={isPending ? "Enviando" : "Enviar"}
                />
              </div>
            </div>
            {/*recuperar contraseña*/}
            <div className="text-center">
              <p className="flex flex-col">¿Ya tienes una cuenta?</p>
              <a
                className="inline-block align-baseline text-black  font-bold   text-blue hover:text-blue-darker"
                href="#"
              >
                Iniciar sesión
              </a>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
