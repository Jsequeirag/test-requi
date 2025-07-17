import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { useApiSend } from "../../api/config/customHooks";
import { recoverPassword } from "../../api/urls/auth";
import RegisterStore from "../../../stores/RegisterStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

// --- Iconos SVG personalizados y animados (copiados de Login/Register para consistencia) ---
const UserIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const ArrowRightIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

const ArrowLeftIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16l-4-4m0 0l4-4m-4 4h18"
    />
  </svg>
);

const SpinnerIcon = ({ className }) => (
  <svg className={`${className} animate-spin`} fill="none" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const SunIcon = ({ className }) => (
  <motion.svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="#F59E0B"
    animate={{
      rotate: [0, 360],
      scale: [1, 1.1, 1],
    }}
    transition={{
      rotate: {
        type: "tween",
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      },
      scale: {
        type: "tween",
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
  >
    <g stroke="#FCD34D" strokeWidth={2}>
      <path
        strokeLinecap="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
      />
    </g>
    <circle
      cx="12"
      cy="12"
      r="4"
      strokeWidth={2}
      stroke="#F59E0B"
      fill="#FCD34D"
    />
    <circle
      cx="12"
      cy="12"
      r="2.5"
      strokeWidth={1.5}
      stroke="#F59E0B"
      fill="#FEF3C7"
    />
  </motion.svg>
);

const CloudSunIcon = ({ className }) => (
  <motion.svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    animate={{
      y: [0, -4, 0],
      rotate: [0, 2, -2, 0],
    }}
    transition={{
      type: "tween",
      y: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
      rotate: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
  >
    <motion.g
      className="opacity-85"
      stroke="#FCD34D"
      animate={{ rotate: [0, 360] }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <path strokeLinecap="round" strokeWidth={2} d="M12 1v3" />
      <path strokeLinecap="round" strokeWidth={1.5} d="M21 9h-2.5" />
      <path strokeLinecap="round" strokeWidth={1.5} d="M5.5 9H3" />
      <path
        strokeLinecap="round"
        strokeWidth={1.5}
        d="M18.36 3.64l-1.41 1.41"
      />
      <path strokeLinecap="round" strokeWidth={1.5} d="M5.64 3.64l1.41 1.41" />
      <path
        strokeLinecap="round"
        strokeWidth={1.5}
        d="M18.36 14.36l-1.41-1.41"
      />
      <path strokeLinecap="round" strokeWidth={1.5} d="M5.64 14.36l1.41-1.41" />
      <path strokeLinecap="round" strokeWidth={1} d="M12 15v2" />
    </motion.g>

    <motion.g
      animate={{
        scale: [1, 1.08, 1],
        opacity: [0.9, 1, 0.9],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <circle
        cx="12"
        cy="9"
        r="4.5"
        strokeWidth={0.5}
        stroke="#FEF3C7"
        fill="none"
        className="opacity-30"
      />
      <circle
        cx="12"
        cy="9"
        r="3.5"
        strokeWidth={2}
        stroke="#F59E0B"
        fill="#FEF3C7"
      />
      <circle
        cx="12"
        cy="9"
        r="2.2"
        strokeWidth={1.5}
        stroke="#F59E0B"
        fill="#FCD34D"
      />
      <circle
        cx="11.5"
        cy="8.5"
        r="0.8"
        fill="#FEF3C7"
        stroke="none"
        className="opacity-70"
      />
    </motion.g>

    <motion.g
      animate={{
        x: [0, 3, 0],
        scale: [1, 1.03, 1],
        y: [0, -1, 0],
      }}
      transition={{
        x: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        },
        scale: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        stroke="#D1D5DB"
        fill="#F9FAFB"
        d="M3.2 17.2a3 3 0 013-3h1a5 5 0 019.5-1.5A4 4 0 0119.2 20.2H6.2a3 3 0 01-3-3z"
        className="opacity-40"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        stroke="#9CA3AF"
        fill="white"
        d="M3 17a3 3 0 013-3h1a5 5 0 019.5-1.5A4 4 0 0119 20H6a3 3 0 01-3-3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        stroke="#E5E7EB"
        fill="none"
        d="M8 18c2-0.3 4-0.3 6 0M6.5 16.8c1.5-0.2 3-0.2 4.5 0M13.5 16.8c1.5-0.2 3-0.2 4.5 0"
        className="opacity-50"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.8}
        stroke="#F3F4F6"
        fill="none"
        d="M7 15.5c1-0.3 2-0.3 3 0M14 15.5c1-0.3 2-0.3 3 0"
        className="opacity-60"
      />
    </motion.g>
  </motion.svg>
);

const MoonIcon = ({ className }) => (
  <motion.svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="#6B7280"
    animate={{
      rotate: [0, 10, -10, 0],
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
    }}
    transition={{
      type: "tween",
      rotate: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
      scale: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
      opacity: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      stroke="#6B7280"
      fill="#E5E7EB"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </motion.svg>
);
// --- Fin Iconos SVG ---

export default function RecoverPassword() {
  const { isPending, error, mutateAsync } = useApiSend(recoverPassword);
  //global
  const [formValues, setFormValues] = useState({});
  const [userExisted, setUserExisted] = useState();
  const [focusedField, setFocusedField] = useState(null); // Para manejar el enfoque del input
  const registerValues = RegisterStore((state) => state.registerValues); // eslint-disable-line no-unused-vars
  const setRegisterValues = RegisterStore((state) => state.setRegisterValues);
  //router
  const navigate = useNavigate();

  // --- Sección de Saludos ---
  const [greeting, setGreeting] = useState({ message: "", icon: SunIcon });

  const getGreeting = () => {
    const nowInCostaRica = new Date();
    const currentHourCR = nowInCostaRica.getHours();

    if (currentHourCR >= 5 && currentHourCR < 12) {
      return { message: "Buenos días", icon: SunIcon };
    } else if (currentHourCR >= 12 && currentHourCR < 18) {
      return { message: "Buenas tardes", icon: CloudSunIcon };
    } else {
      return { message: "Buenas noches", icon: MoonIcon };
    }
  };

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);
  // --- Fin Sección de Saludos ---

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

  // --- Variantes de animación (copiadas de Login/Register) ---
  const backgroundVariants = {
    hidden: {
      opacity: 0,
      scale: 1.05,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.8,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotate: -180,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.8,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const formVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.2,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const greetingVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 1.0,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };
  // --- Fin Variantes de animación ---

  return (
    <motion.div
      className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden"
      initial="hidden"
      animate="visible"
    >
      {/* Wallpaper Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/Male-Lion.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
        variants={backgroundVariants}
      />

      {/* Overlay para mejor contraste */}
      <motion.div
        className="absolute inset-0 bg-black/25"
        variants={backgroundVariants}
      />

      {/* Main Container */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
      >
        {/* Recover Password Card */}
        <div className="bg-white/50 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden backdrop-saturate-150">
          {/* Header with Logo */}
          <div className="bg-gradient-to-r from-[#bdab78]/40 to-[#a38e67]/40 backdrop-blur-md px-8 py-10 text-center relative border-b border-white/20">
            <div className="absolute inset-0 bg-black/10"></div>
            <motion.div className="relative z-10" variants={logoVariants}>
              {/* Saludo dinámico */}
              <motion.div
                className="mb-6 flex items-center justify-center gap-3"
                variants={greetingVariants}
              >
                <motion.div
                  className="p-3 bg-white/30 backdrop-blur-md rounded-full border border-white/40 shadow-lg"
                  whileHover={{
                    scale: 1.15,
                    rotate: 15,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  animate={{
                    boxShadow: [
                      "0 5px 15px rgba(0, 0, 0, 0.1)",
                      "0 8px 25px rgba(0, 0, 0, 0.15)",
                    ],
                  }}
                  style={{
                    transition: {
                      boxShadow: {
                        type: "tween",
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    },
                  }}
                >
                  <greeting.icon className="w-7 h-7 text-gray-800 drop-shadow-lg stroke-2" />
                </motion.div>
                <motion.p
                  className="text-lg font-semibold text-gray-800 drop-shadow-lg"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    textShadow: [
                      "0 2px 4px rgba(0, 0, 0, 0.1)",
                      "0 4px 8px rgba(0, 0, 0, 0.2)",
                      "0 2px 4px rgba(0, 0, 0, 0.1)",
                    ],
                  }}
                  transition={{
                    type: "tween",
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {greeting.message}
                </motion.p>
              </motion.div>

              {/* Logo de Recuperar Contraseña (Adaptado del de Register) */}
              <motion.div
                className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg border border-white/30"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: "0 20px 40px rgba(189, 171, 120, 0.3)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="text-2xl font-bold text-black/85 drop-shadow-lg">
                  R
                </span>{" "}
                {/* Puedes cambiar 'R' por algo más representativo de recuperar, como '?' o '🔑' */}
              </motion.div>

              {/* Títulos */}
              <motion.h1
                className="text-2xl font-bold text-black/70 drop-shadow-lg"
                animate={{ opacity: [0, 1] }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                Recuperar contraseña
              </motion.h1>
              <motion.p
                className="text-black/70 font-medium mt-1"
                animate={{ opacity: [0, 1] }}
                transition={{ delay: 1.6, duration: 0.6 }}
              >
                Ingresa tu ID de empleado
              </motion.p>
            </motion.div>
          </div>

          {/* Form Section */}
          <motion.div
            className="px-8 py-8 bg-white/15 backdrop-blur-md"
            variants={formVariants}
          >
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Mensaje de error/info */}
              {(userExisted || error) && (
                <motion.div
                  className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center">
                    <div className="text-blue-400 mr-2">
                      <FontAwesomeIcon icon={faInfoCircle} size="lg" />
                    </div>
                    <p className="text-black/70 font-medium">
                      {userExisted && "El usuario ya está registrado."}
                      {error && "El usuario no existe."}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Campo ID de empleado */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-black/70 ml-1 drop-shadow-sm">
                  ID de empleado / Lion login
                </label>
                <div className="relative group">
                  <UserIcon
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                      focusedField === "employeeId"
                        ? "text-[#bdab78]"
                        : "text-black/60"
                    }`}
                  />
                  <input
                    type="number"
                    name="employeeId"
                    id="employeeId"
                    placeholder="Ingresa tu usuario, ejemplo: 718956"
                    className={`w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-md border-2 rounded-xl font-medium text-black/70 placeholder-black/50 
                      transition-all duration-300 focus:outline-none focus:bg-white/25 focus:shadow-lg border-white/30
                      ${
                        focusedField === "employeeId"
                          ? "border-[#bdab78] bg-white/25 shadow-lg shadow-[#bdab78]/20"
                          : "border-white/30 hover:border-white/50 hover:bg-white/25"
                      }`}
                    onChange={handleData}
                    onFocus={() => setFocusedField("employeeId")}
                    onBlur={() => setFocusedField(null)}
                    autoComplete="off"
                    required
                  />
                </div>
              </motion.div>

              {/* Botón de envío */}
              <motion.button
                type="submit"
                disabled={isPending}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform relative overflow-hidden
                    ${
                      isPending
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r bg-[#bdab78] text-black/85 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#bdab78]/30 active:scale-[0.98]"
                    }`}
                whileTap={{ scale: isPending ? 1 : 0.96 }}
                whileHover={{ scale: isPending ? 1 : 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >
                <div className="flex items-center justify-center space-x-3 relative z-10">
                  {isPending ? (
                    <>
                      <SpinnerIcon className="w-5 h-5" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar</span>
                      <ArrowRightIcon className="w-5 h-5" />
                    </>
                  )}
                </div>

                {/* Efecto de brillo */}
                {!isPending && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
                )}
              </motion.button>

              {/* Enlaces adicionales */}
              <motion.div
                className="space-y-4 pt-6 border-t border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.6 }}
              >
                <div className="text-center">
                  <p className="text-black/70 mb-2 font-medium drop-shadow-sm">
                    ¿Ya tienes una cuenta?
                  </p>
                  <a
                    href="/login"
                    className="inline-flex items-center space-x-2 text-[#bdab78] hover:text-[#a38e67] font-semibold transition-colors duration-200 hover:underline drop-shadow-sm"
                  >
                    <ArrowLeftIcon className="w-4 h-4" />
                    <span>Iniciar sesión</span>
                  </a>
                </div>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
