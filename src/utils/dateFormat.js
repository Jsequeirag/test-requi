export const formatIsoDateToYYYYMMDD = (stringDate) => {
  try {
    const date = new Date(stringDate);
    return date.toISOString().split("T")[0].toString();
  } catch (e) {
    console.log(e);
  }
};
