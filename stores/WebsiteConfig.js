import { create } from "zustand";

export const getInitialThemeColorNumber = () => {
  if (typeof window !== "undefined") {
    // Asegura que estemos en el navegador
    const storedTheme = localStorage.getItem("requitool-themeColorNumber");
    alert(storedTheme);
    if (storedTheme !== null) {
      // Intenta parsear a número. Si falla, usa 0 (o un valor por defecto seguro)
      const parsed = parseInt(storedTheme, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed < 10) {
        // Valida que sea un número válido dentro del rango
        return parsed;
      }
    }
  }
  // Si no hay nada en localStorage o es inválido, devuelve un número aleatorio por defecto
  // Genera un número aleatorio inicial si no hay nada guardado
  return Math.floor(Math.random() * 10); // Asume que tienes 10 temas (0-9)
};

const websiteConfig = create((set) => ({
  shrinkMenu: false,
  darkMode: {},
  setDarkMode: {},
  registerValues: {},
  themeColorNumber: 0,
  setThemeColorNumber: (number) => {
    set((state) => {
      // Valida el número antes de guardar
      if (number >= 0 && number < state.themeColors.length) {
        if (typeof window !== "undefined") {
          localStorage.setItem("requitool-themeColorNumber", number.toString()); // Guarda en localStorage
        }
        return { themeColorNumber: number };
      }
      return {}; // No actualiza si el número es inválido
    });
  },
  setRandomThemeColorNumber: () => {
    set((state) => {
      const themeColors = state.themeColors;
      const randomIndex = Math.floor(Math.random() * themeColors.length);
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "requitool-themeColorNumber",
          randomIndex.toString()
        ); // Guarda en localStorage
      }
      return { themeColorNumber: randomIndex };
    });
  },
  setRegisterValues: (value) => {
    set(() => ({
      registerValues: value,
    }));
  },
  setShrinkMenu: (bool) => {
    set(() => ({
      shrinkMenu: bool,
    }));
  },
  themeColors: [
    {
      bgColor: "bg-gray-100 dark:bg-gray-900",
      accentColor: "bg-gray-500 dark:bg-gray-300",
      hoverColor: "hover:bg-gray-100 dark:hover:bg-gray-500", // Un poco más oscuro/claro para hover
    },
    {
      bgColor: "bg-blue-100 dark:bg-blue-800",
      accentColor: "bg-blue-600 dark:bg-blue-400",
      hoverColor: "hover:bg-blue-100 dark:hover:bg-blue-800",
    },
    {
      bgColor: "bg-violet-100 dark:bg-violet-900",
      accentColor: "bg-violet-500 dark:bg-violet-300",
      hoverColor: "hover:bg-violet-200 dark:hover:bg-violet-900",
    },
    {
      bgColor: "bg-green-100 dark:bg-green-900",
      accentColor: "bg-green-600 dark:bg-green-400",
      hoverColor: "hover:bg-green-300 dark:hover:bg-green-900",
    },
    {
      bgColor: "bg-teal-100 dark:bg-teal-900",
      accentColor: "bg-teal-600 dark:bg-teal-100 ",
      hoverColor: "hover:bg-teal-100  dark:hover:bg-teal-900",
    },
    {
      bgColor: "bg-cyan-100 dark:bg-cyan-900",
      accentColor: "bg-cyan-700 dark:bg-cyan-300",
      hoverColor: "hover:bg-cyan-100 dark:hover:bg-cyan-900",
    },
    {
      bgColor: "bg-orange-100 dark:bg-orange-900",
      accentColor: "bg-orange-800 dark:bg-orange-300",
      hoverColor: "hover:bg-orange-700 dark:hover:bg-orange-500",
    },
  ],
}));
export default websiteConfig;
