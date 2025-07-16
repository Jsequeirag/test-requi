import React, { useReducer, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/urls/auth";
import { useApiSend } from "../../api/config/customHooks";
import { saveLocalStorage } from ".././/../utils/localstore";

const initialState = { formValues: { employeeId: "", password: "" } };
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FORM_VALUES":
      return {
        ...state,
        formValues: { ...state.formValues, ...action.payload },
      };
    default:
      return state;
  }
};

// Iconos SVG personalizados
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

const LockIcon = ({ className }) => (
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
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
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

const EyeIcon = ({ className }) => (
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
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeOffIcon = ({ className }) => (
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
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
    />
  </svg>
);

const CheckIcon = ({ className }) => (
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
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const getRoles = (Roles) => {
  const roleNames = Roles.filter(
    (roleUser) => roleUser && roleUser.role && roleUser.role.name
  ) // Filtra objetos válidos
    .map((roleUser) => roleUser.role.name); // Mapea a solo el nombre del rol
  return roleNames;
};

// Función para guardar con expiración

const Login = () => {
  const navigate = useNavigate();
  const [state, dispatcher] = useReducer(reducer, initialState);
  const { isPending, mutateAsync } = useApiSend(login);
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(false);

  const saveWithExpiration = () => {
    const now = new Date();
    const expirationTime = rememberSession
      ? now.getTime() + 30 * 24 * 60 * 60 * 1000 // 30 días
      : now.getTime() + 24 * 60 * 60 * 1000; // 24 horas

    const item = {
      expiration: expirationTime,
    };
    if (rememberSession) {
      return localStorage.setItem("sessionExpiration", JSON.stringify(item));
    }
    return localStorage.removeItem("sessionExpiration", JSON.stringify(item));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateAsync(state.formValues);
      console.log("Login successful:", data);

      // Usar la función personalizada para guardar con expiración
      saveLocalStorage("requitool-employeeInfo", JSON.stringify(data));
      saveLocalStorage("requitool-roles", JSON.stringify(getRoles(data.role)));
      saveLocalStorage("requitool-rememberSession", rememberSession.toString());
      saveWithExpiration(rememberSession);
      // Guardar preferencia de recordar sesión

      navigate("/home");
    } catch (err) {
      console.error("Error en el login:", err);
    }
  };

  // Variantes de animación mejoradas
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

  return (
    <motion.div
      className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden"
      initial="hidden"
      animate="visible"
    >
      {/* Wallpaper Background - Animado mejorado */}
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

      {/* Overlay para mejor contraste del formulario */}
      <motion.div
        className="absolute inset-0 bg-black/25"
        variants={backgroundVariants}
      />

      {/* Main Container */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
      >
        {/* Login Card - Glassmorphism mejorado para mejor visibilidad */}
        <div className="bg-white/50 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden backdrop-saturate-150">
          {/* Header with Logo */}
          <div className="bg-gradient-to-r from-[#bdab78]/40 to-[#a38e67]/40 backdrop-blur-md px-8 py-10 text-center relative border-b border-white/20">
            <div className="absolute inset-0 bg-black/10"></div>
            <motion.div className="relative z-10" variants={logoVariants}>
              {/* Logo con animación mejorada */}
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
                </span>
              </motion.div>

              {/* Title con animación de texto */}
              <motion.h1
                className="text-2xl font-bold text-black/70 drop-shadow-lg"
                animate={{ opacity: [0, 1] }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                Requitools
              </motion.h1>
              <motion.p
                className="text-black/70 font-medium mt-1"
                animate={{ opacity: [0, 1] }}
                transition={{ delay: 1.6, duration: 0.6 }}
              >
                Bienvenido de vuelta
              </motion.p>
            </motion.div>
          </div>

          {/* Form Section - Con mayor opacidad para mejor visibilidad */}
          <motion.div
            className="px-8 py-8 bg-white/15 backdrop-blur-md"
            variants={formVariants}
          >
            <div className="space-y-6">
              {/* Campo Usuario */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-black/70 ml-1 drop-shadow-sm">
                  Usuario
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
                    type="text"
                    name="employeeId"
                    placeholder="Ingresa tu usuario"
                    className={`w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-md border-2 rounded-xl font-medium text-black/70 placeholder-black/50 
                      transition-all duration-300 focus:outline-none focus:bg-white/25 focus:shadow-lg border-white/30
                      ${
                        focusedField === "employeeId"
                          ? "border-[#bdab78] bg-white/25 shadow-lg shadow-[#bdab78]/20"
                          : "border-white/30 hover:border-white/50 hover:bg-white/25"
                      }`}
                    onChange={(e) => {
                      dispatcher({
                        type: "SET_FORM_VALUES",
                        payload: { [e.target.name]: e.target.value },
                      });
                    }}
                    onFocus={() => setFocusedField("employeeId")}
                    onBlur={() => setFocusedField(null)}
                    autoComplete="username"
                  />
                </div>
              </motion.div>

              {/* Campo Contraseña */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-black/70 ml-1 drop-shadow-sm">
                  Contraseña
                </label>
                <div className="relative group">
                  <LockIcon
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                      focusedField === "password"
                        ? "text-[#bdab78]"
                        : "text-black/60"
                    }`}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    className={`w-full pl-12 pr-12 py-4 bg-white/20 backdrop-blur-md border-2 rounded-xl font-medium text-black/70 placeholder-black/50 
                      transition-all duration-300 focus:outline-none focus:bg-white/25 focus:shadow-lg border-white/30
                      ${
                        focusedField === "password"
                          ? "border-[#bdab78] bg-white/25 shadow-lg shadow-[#bdab78]/20"
                          : "border-white/30 hover:border-white/50 hover:bg-white/25"
                      }`}
                    onChange={(e) => {
                      dispatcher({
                        type: "SET_FORM_VALUES",
                        payload: { [e.target.name]: e.target.value },
                      });
                    }}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    minLength={6}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black/60 hover:text-[#bdab78] transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Checkbox Recordar Sesión */}
              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7, duration: 0.5 }}
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    id="rememberSession"
                    checked={rememberSession}
                    onChange={(e) => setRememberSession(e.target.checked)}
                    className="sr-only"
                  />
                  <motion.label
                    htmlFor="rememberSession"
                    className={`flex items-center justify-center w-5 h-5 rounded border-2 cursor-pointer transition-all duration-200 ${
                      rememberSession
                        ? "bg-[#bdab78] border-[#bdab78] text-white"
                        : "bg-white/20 border-white/40 hover:border-white/60"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {rememberSession && (
                      <CheckIcon className="w-3 h-3 stroke-[3]" />
                    )}
                  </motion.label>
                </div>
                <label
                  htmlFor="rememberSession"
                  className="text-sm font-medium text-black/70 cursor-pointer select-none drop-shadow-sm"
                >
                  Recordar sesión por 30 días
                </label>
              </motion.div>

              {/* Botón de login */}
              <motion.button
                onClick={onSubmit}
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
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                <div className="flex items-center justify-center space-x-3 relative z-10">
                  {isPending ? (
                    <>
                      <SpinnerIcon className="w-5 h-5" />
                      <span>Iniciando sesión...</span>
                    </>
                  ) : (
                    <>
                      <span>Iniciar Sesión</span>
                      <ArrowRightIcon className="w-5 h-5" />
                    </>
                  )}
                </div>

                {/* Efecto de brillo mejorado */}
                {!isPending && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
                )}
              </motion.button>

              {/* Enlaces adicionales */}
              <motion.div
                className="space-y-4 pt-6 border-t border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0, duration: 0.6 }}
              >
                <div className="text-center">
                  <p className="text-black/70 mb-2 font-medium drop-shadow-sm">
                    ¿No tienes cuenta?
                  </p>
                  <a
                    href="/register"
                    className="inline-flex items-center text-[#bdab78] hover:text-[#a38e67] font-semibold transition-colors duration-200 hover:underline drop-shadow-sm"
                  >
                    Regístrate aquí
                  </a>
                </div>

                <div className="text-center">
                  <a
                    href="/recoverPassword"
                    className="inline-flex items-center text-black/70 hover:text-black font-medium transition-colors duration-200 hover:underline drop-shadow-sm"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
