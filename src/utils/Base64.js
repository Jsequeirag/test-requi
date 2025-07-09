export const convertirBase64 = (archivo) => {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onloadend = () => {
      resolve(lector.result);
    };
    lector.onerror = reject;
    lector.readAsDataURL(archivo);
  });
};
