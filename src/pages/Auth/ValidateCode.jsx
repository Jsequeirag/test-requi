import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextButton from "../../components/Button/TextButton";
import { motion } from "framer-motion";
import { useApiSend } from "../../api/config/customHooks";
import { Register as registerUser } from "../../api/urls/auth";
import RegisterStore from "../../../stores/RegisterStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmarkCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
export default function Register() {
  const { isPending, error, mutateAsync } = useApiSend(registerUser);
  //global
  const [formValues, setFormValues] = useState({});
  const [invalidCode, setInvalidCode] = useState();

  const registerValues = RegisterStore((state) => state.registerValues);
  const setRegisterValues = RegisterStore((state) => state.setRegisterValues);
  //router
  const navigate = useNavigate();
  //submit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (formValues.code === registerValues.code) {
      navigate("/updatePassword");
    } else {
      setInvalidCode("invalido");
    }
  };
  //handleData
  function handleData(e) {
    setFormValues({ [e.target.name]: e.target.value });
    if (registerValues.code === e.target.value) {
      setInvalidCode("valido");
    } else {
      setInvalidCode("invalido");
    }
  }
  return (
    <motion.div
      className="box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg flex flex-col justify-center items-center h-[100vh]">
        <div className="flex pc:w-[45%] movil:w-[95%]  bg-slate-50 p-1">
          <a href="/register">
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
            <p className="text-4xl mb-4 font-semibold">
              Código de verificación
            </p>
            <p className="text-black my-2">
              <FontAwesomeIcon
                className="text-blue-500 mr-1"
                icon={faInfoCircle}
                size="lg"
              />
              Hola,{" "}
              <b>
                {registerValues?.employee?.nombre || registerValues?.user?.name}
              </b>{" "}
              digita el código enviado al correo:{" "}
              <b>
                {registerValues?.employee?.e_Mail ||
                  registerValues?.user?.email}
              </b>
            </p>
            <label
              className="block text-black text-lg font-bold  mb-2"
              htmlFor="code"
            >
              código
            </label>
            <input
              className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
              id="code"
              type="number"
              name="code"
              placeholder="Ejemplo: 245"
              onChange={handleData}
              /* required*/
              autoComplete="off"
              required
            />{" "}
            {invalidCode === "valido" && (
              <div className="flex items-center mt-2">
                <>
                  <div className="text-green-500 mr-1">
                    <FontAwesomeIcon icon={faCheckCircle} size="lg" />
                  </div>
                  <p className="text-gray-500 ">Código válido</p>
                </>
              </div>
            )}
            {invalidCode === "invalido" && formValues.code.length >= 3 && (
              <div className="flex items-center mt-2">
                <>
                  <div className="text-red-500 mr-1">
                    <FontAwesomeIcon icon={faXmarkCircle} size="lg" />
                  </div>
                  <p className="text-gray-500 ">Código inválido</p>
                </>
              </div>
            )}
            <p className="text-black">{registerValues?.code}</p>
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
