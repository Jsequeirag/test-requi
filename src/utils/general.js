export const formatUserName = (fullName) => {
  if (!fullName || typeof fullName !== "string") {
    return "Usuario"; // Valor por defecto si el nombre es nulo o no es una cadena
  }

  // Limpiar espacios extra y dividir el nombre en partes
  const parts = fullName
    .trim()
    .split(/\s+/)
    .filter((part) => part.length > 0);

  if (parts.length === 0) {
    return "Usuario"; // Si después de limpiar no quedan partes
  }

  let firstName = "";
  let formattedSurnames = "";

  if (parts.length >= 3) {
    // Caso: "ApellidoPaterno ApellidoMaterno Nombre" (ej. "Quiros Alvarado Erick")
    // El nombre de pila es la última parte
    firstName = parts[parts.length - 1];
    // El primer apellido es la primera parte
    const apellidoPaterno = parts[0];
    // La inicial del segundo apellido es la primera letra de la segunda parte
    const apellidoMaternoInitial = parts[1].charAt(0).toUpperCase() + ".";

    formattedSurnames = `${apellidoPaterno} ${apellidoMaternoInitial}`;
  } else if (parts.length === 2) {
    // Caso: "Apellido Nombre" (ej. "Quiros Erick")
    // Asumimos que el segundo elemento es el nombre de pila
    firstName = parts[1];
    // El primer elemento es el apellido
    const apellidoPaterno = parts[0];
    formattedSurnames = apellidoPaterno;
  } else {
    // Caso: Solo una palabra, la tratamos como nombre de pila
    firstName = parts[0];
  }

  // Unir el nombre de pila y los apellidos formateados
  const result = `${firstName} ${formattedSurnames}`.trim();

  // Si después de todo, el resultado es vacío (ej. si fullName era solo espacios), devolver "Usuario"
  return result === "" ? "Usuario" : result;
};
