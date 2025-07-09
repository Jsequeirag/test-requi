import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextButton from "../../components/Button/TextButton";
import { motion } from "framer-motion";
import { useApiSend } from "../../api/config/customHooks";
import { updatePassword } from "../../api/urls/auth";
import RegisterStore from "../../../stores/RegisterStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
export default function Register() {
  const { isPending, error, mutateAsync } = useApiSend(updatePassword);
  //global
  const [formValues, setFormValues] = useState({});
  const registerValues = RegisterStore((state) => state.registerValues);
  const [matchPassword, setMatchPassword] = useState(true);
  //router
  const navigate = useNavigate();
  //onSubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (validatePassword()) {
      mutateAsync({
        ...formValues,
        ["employeeId"]:
          registerValues?.employee?.empleado ||
          registerValues?.user?.employeeId,
      })
        .then((data) => {
          navigate("/login");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setMatchPassword(false);
    }
  };
  //handleData
  function handleData(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }
  //validar contraseña
  const validatePassword = () => {
    if (formValues.password === formValues.confirmPassword) {
      return true;
    }
    return false;
  };

  return (
    <motion.div
      className="box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg flex flex-col justify-center items-center h-[100vh]">
        <div className="flex pc:w-[45%] movil:w-[95%]  bg-slate-50 p-1">
          <a href="/validateCode">
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
              <p className="text-4xl mb-4 font-semibold">Actualizar Password</p>
              <div className="flex  items-center">
                {!matchPassword && (
                  <>
                    <div className="text-blue-500 mr-1">
                      <FontAwesomeIcon icon={faInfoCircle} size="lg" />
                    </div>
                    <p className="text-gray-500 ">Contraseñas no coninciden</p>
                  </>
                )}
              </div>

              <label
                className="block text-black text-lg font-bold mb-2"
                htmlFor="employeeId"
              >
                Contraseña
              </label>
              <p className="text-gray-700 italic">
                {error && "El usuario no existe"}
              </p>
              <input
                className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
                id="password"
                type="repeat"
                name="password"
                placeholder="******"
                onChange={handleData}
                /* required*/
                autoComplete="off"
                minLength={6}
                required
              />
              <label
                className="block text-black text-lg font-bold mb-2"
                htmlFor="employeeId"
              >
                Confirmar contraseña
              </label>
              <p className="text-gray-700 italic">
                {error && "El usuario no existe"}
              </p>
              <input
                className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="******"
                onChange={handleData}
                minLength={6}
                /* required*/
                autoComplete="off"
                required
              />
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
