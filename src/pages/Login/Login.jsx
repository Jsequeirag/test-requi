import { useNavigate } from "react-router-dom";
import { React, useState, Fragment } from "react";

import "./login.css";
import { motion } from "framer-motion";
import Loading from "../../components/Loading/Loading";
import TextButton from "../../components/Button/TextButton";

import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
const Login = () => {
  const navigate = new useNavigate();
  const [userCredentials, setUserCredentials] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  function handleData(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }
  const handleLogin = async (e) => {};
  return (
    <motion.div
      className="box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg flex flex-row justify-center items-center h-[100vh]">
        <div className="flex flex-row  justify-center items-center pc:w-[45%] movil:w-[95%] backdrop-blur-3xl  shadow-md shadow-gray-800 rounded-sm p-5">
          <div className="flex-1 pc:flex pc:flex-col items-center justify-center h-[400px] rounded-sm  movil:hidden">
            <img
              className="pc:block movil:hidden"
              src="/assets/resourcesLogo.png"
              width="250"
              alt=""
            />
          </div>

          <form onSubmit={handleLogin} className="flex flex-col flex-1 ml-5">
            <div className="m-4 flex justify-center items-center flex-col"></div>
            <div className="mb-4">
              <p className="text-3xl mb-2 ">
                Bienvenido a <span className="font-extrabold ">Requitools</span>
              </p>

              <label
                className="block text-black text-lg font-bold mb-2"
                htmlFor="userName"
              >
                Usuario
              </label>
              <input
                className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
                id="userName"
                type="text"
                name="userName"
                placeholder="Dígite su usuario"
                onChange={handleData}
                /* required*/
                autoComplete="off"
              ></input>
            </div>
            <div className="mb-6">
              <label
                className="block text-black  text-lg font-bold mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                className="shadow border  rounded-sm w-full py-2 px-3 text-grey-darker mb-3 text-lg focus:coutline-input"
                id="password"
                type="password"
                name="password"
                placeholder="******"
                onChange={handleData}
                /* required*/
                minLength={4}
              ></input>
              <p className="text-red-700 text-lg  italic">{errorMessage}</p>
            </div>
            <div className="flex items-center flex-col ">
              <div className="mb-4">
                <TextButton
                  disabled={loading}
                  type={"submit"}
                  onClick={() => {
                    navigate("/home");
                  }}
                  text={"Ingresar"}
                />
              </div>
            </div>
            {/*recuperar contraseña*/}
            <div className="text-center">
              <p className="flex flex-col">¿Has olvidado tu contraseña?</p>
              <a
                className="inline-block align-baseline text-black  font-bold   text-blue hover:text-blue-darker"
                href="#"
              >
                Presione aquí
              </a>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
