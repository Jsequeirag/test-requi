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
      accentColor: "bg-gray-600 dark:bg-gray-400",
    },
    {
      bgColor: "bg-blue-100 dark:bg-blue-900",
      accentColor: "bg-blue-600 dark:bg-blue-400",
    },
    {
      bgColor: "bg-indigo-100 dark:bg-indigo-900",
      accentColor: "bg-indigo-600 dark:bg-indigo-400",
    },
    {
      bgColor: "bg-green-100 dark:bg-green-900",
      accentColor: "bg-green-600 dark:bg-green-400",
    },
    {
      bgColor: "bg-teal-100 dark:bg-teal-900",
      accentColor: "bg-teal-600 dark:bg-teal-400",
    },

    {
      bgColor: "bg-cyan-100 dark:bg-cyan-900",
      accentColor: "bg-cyan-600 dark:bg-cyan-400",
    },
    {
      bgColor: "bg-orange-100 dark:bg-orange-900",
      accentColor: "bg-orange-600 dark:bg-orange-400",
    },
    {
      bgColor: "bg-stone-100 dark:bg-stone-900",
      accentColor: "bg-yellow-600 dark:bg-yellow-400", // Accent amarillo para Stone
    },
    {
      bgColor: "bg-slate-100 dark:bg-slate-900",
      accentColor: "bg-emerald-600 dark:bg-emerald-400", // Accent esmeralda para Slate
    },
    {
      bgColor: "bg-neutral-100 dark:bg-neutral-900",
      accentColor: "bg-sky-600 dark:bg-sky-400", // Accent sky para Neutral
    },
  ],
}));
export default websiteConfig;
