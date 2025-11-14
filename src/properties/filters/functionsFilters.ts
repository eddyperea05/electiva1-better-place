//import de tipos
import type { Filter } from "../context/types/PropertiesContextTypes";
import type { PropiedadInterface } from "../types/propertyType";

const getTime = (date: any) =>
  date instanceof Date ? date.getTime() : date.toDate().getTime();

/* función para aplicar los filtros */
export const filters = (filter: Filter, properties: any) => {
  let result = [...properties];

  // filtro por tipo de propiedad
  if (filter?.typeProperties && filter.typeProperties.length > 0) {
    result = result.filter((property: PropiedadInterface) =>
      filter.typeProperties!.includes(property.typeProperty)
    );

    //Hacemos que el string sea vacio para que no intervenga con el fastFilter
    filter.sortBy = "";
  }

  // filtro para saber si se selecciono una cantidad
  if (filter.amountStuffs) {
    //usamos destructuración de objetos para sacar el valor de cada uno de los stuffs
    /* Las variables estan en español porque estos valores se sacan directamente del objeto 
    el cual tiene el valor en español y es necesario que este en español */
    const { habitaciones, baños, parqueaderos } = filter.amountStuffs;

    result = result.filter((property: PropiedadInterface) => {
      /* En las 3 variables podemos almacenar la cantidad que se van a usar y devolverlo para que
      se filtre */
      const matchRooms =
        habitaciones === undefined
          ? true
          : habitaciones === "5+"
          ? property.rooms >= 5
          : property.rooms === habitaciones;

      const matchBaths =
        baños === undefined
          ? true
          : baños === "5+"
          ? property.baths >= 5
          : property.baths === baños;

      const matchParkingLot =
        parqueaderos === undefined
          ? true
          : parqueaderos === "5+"
          ? property.parkingLots >= 5
          : property.parkingLots === parqueaderos;

      //Hacemos que el string sea vacio para que no intervenga con el fastFilter
      filter.sortBy = "";

      //Retornamos los valores selecionados por el usuario
      return matchRooms && matchBaths && matchParkingLot;
    });
  }

  /* filtro para rango de precios de la propiedad */
  if (filter.budgetRange) {
    //Descructuramos las variables
    const { min, max } = filter.budgetRange;

    //Filtramos el precio por sus rangos
    result = result.filter((property: PropiedadInterface) => {
      const precio = property.price;

      const matchMin = min !== undefined ? precio >= min : true;
      const matchMax = max !== undefined ? precio <= max : true;

      //Hacemos que el string sea vacio para que no intervenga con el fastFilter
      filter.sortBy = "";

      //Retetornamos los valors del maximo y minimo
      return matchMin && matchMax;
    });
  }

  /* filtro para rango de metros de la propiedad */
  if (filter.metersRange) {
    //Descructuramos las variables
    const { min, max } = filter.metersRange;

    //Filtramos los metros por sus rangos
    result = result.filter((property: PropiedadInterface) => {
      const metres = property.metres;

      const matchMin = min !== undefined ? metres >= min : true;
      const matchMax = max !== undefined ? metres <= max : true;

      //Hacemos que el string sea vacio para que no intervenga con el fastFilter
      filter.sortBy = "";

      //Retetornamos los valors del maximo y minimo
      return matchMin && matchMax;
    });
  }

  /* filtro para los precios de los más caros a los más baratos */
  if (filter.sortBy === "mayor precio") {
    const newOrder = [...properties].sort((a, b) => b.price - a.price);
    return newOrder;
  }

  /* filtro para los precios más baratos a los más caros */
  if (filter.sortBy === "menor precio") {
    const newOrder = [...properties].sort((a, b) => a.price - b.price);
    return newOrder;
  }

  /* filtros de las propiedades más recientes a las más antiguas */
  if (filter.sortBy === "más recientes") {
    return [...properties].sort((a, b) => {
      return getTime(b.publicationDate) - getTime(a.publicationDate);
    });
  }

  /* filtro de las propiedades menos recientes a las más recientes */
  if (filter.sortBy === "menos recientes") {
    return [...properties].sort((a, b) => {
      return getTime(a.publicationDate) - getTime(b.publicationDate);
    });
  }

  /* filtro de las propiedades con más habitaciones a las que tienen menos habitaciones */
  if (filter.sortBy === "más habitaciones") {
    const newOrder = [...properties].sort((a, b) => b.rooms - a.rooms);
    return newOrder;
  }

  /* filtro de las propiedades con menos habitaciones a las que tienen más habitaciones */
  if (filter.sortBy === "menos habitaciones") {
    const newOrder = [...properties].sort((a, b) => a.rooms - b.rooms);
    return newOrder;
  }

  /* retorno de las propiedades normales sin filtro */
  return result;
};
