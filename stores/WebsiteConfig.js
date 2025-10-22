import { create } from "zustand";

export const getInitialThemeColorNumber = () => {
  if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("requitool-themeColorNumber");
    if (storedTheme !== null) {
      const parsed = parseInt(storedTheme, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed < 10) {
        return parsed;
      }
    }
  }
  return Math.floor(Math.random() * 10);
};

// 🌐 idioma inicial
export const getInitialLanguage = () => {
  if (typeof window !== "undefined") {
    const storedLang = localStorage.getItem("requi-language");
    if (storedLang === "en" || storedLang === "es") return storedLang;
  }
  return "es"; // por defecto español
};

const websiteConfig = create((set, get) => ({
  shrinkMenu: false,
  darkMode: {},
  setDarkMode: {},
  registerValues: {},

  // 🌈 Tema
  themeColorNumber: getInitialThemeColorNumber(),
  setThemeColorNumber: (number) => {
    set((state) => {
      if (number >= 0 && number < state.themeColors.length) {
        if (typeof window !== "undefined") {
          localStorage.setItem("requitool-themeColorNumber", number.toString());
        }
        return { themeColorNumber: number };
      }
      return {};
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
        );
      }
      return { themeColorNumber: randomIndex };
    });
  },

  // 🧾 Registro
  setRegisterValues: (value) => set({ registerValues: value }),
  setShrinkMenu: (bool) => set({ shrinkMenu: bool }),

  // 🌐 Idioma
  language: getInitialLanguage(),
  setLanguage: (lang) => {
    if (lang === "es" || lang === "en") {
      if (typeof window !== "undefined") {
        localStorage.setItem("requi-language", lang);
      }
      set({ language: lang });
    }
  },
  toggleLanguage: () => {
    const current = get().language;
    const newLang = current === "es" ? "en" : "es";
    if (typeof window !== "undefined") {
      localStorage.setItem("requi-language", newLang);
    }
    set({ language: newLang });
  },

  // 🎨 Paleta de colores
  themeColors: [
    {
      bgColor: "bg-gray-100 dark:bg-gray-900",
      accentColor: "bg-gray-500 dark:bg-gray-300",
      hoverColor: "hover:bg-gray-100 dark:hover:bg-gray-500",
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
      accentColor: "bg-teal-600 dark:bg-teal-100",
      hoverColor: "hover:bg-teal-100 dark:hover:bg-teal-900",
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
