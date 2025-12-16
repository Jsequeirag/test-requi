import React, { useEffect } from "react";
import loadingScreenStore from "../../../stores/loadingStore";

const LoadingModalLockScreen = () => {
  const { loading, message } = loadingScreenStore();

  useEffect(() => {
    console.log(
      `[Loading] Componente de carga ${loading ? "mostrado" : "oculto"}`
    );
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#034651]/10 backdrop-blur-xl">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#034651] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#034651] text-lg font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default LoadingModalLockScreen;
