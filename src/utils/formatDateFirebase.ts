//Función para darle formato a la fecha de publicación
export const formatDateFirebase = (timestamp: {
  seconds: number;
  nanoseconds: number;
}): string => {
  //Transformamos los milisegundos y nanosegundos a una fecha legible
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1_000_000
  );

  //Retornamos la fecha a hora colombiana
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};
