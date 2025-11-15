import type { Timestamp } from "firebase/firestore";

//Función para calcular el tiempo que uso la propiedad el usuario
export const calculateDateCancel = (timeLease: Timestamp): number => {
  /* Con este condicion validamos que si aun no a pasado un día y el usuario quiera cancelar
    aun asi se le cobre como si fuera un día */
  if (!timeLease?.toDate) return 1;

  //Fecha en la que inicio el usuario a usar la propiedad
  const dateStart = timeLease.toDate();

  //Fecha actual
  const dateEnd = new Date();

  //Converción de milisegundos a días
  const msToDay = 1000 * 60 * 60 * 24;

  //Diferencia entre las fechas
  const diference = dateEnd.getTime() - dateStart.getTime();

  //Calculamos la cantida de días totales
  const totalDays = Math.ceil(diference / msToDay);
  return totalDays;
};
