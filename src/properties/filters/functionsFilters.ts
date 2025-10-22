/* función para aplicar los filtros */
export const filters = (filter: string, properties: any) => {
  /* filtro para los precios de los más caros a los más baratos */
  if (filter === "mayor precio") {
    const newOrder = [...properties].sort((a, b) => b.precio - a.precio);
    return newOrder;
  }

  /* filtro para los precios más baratos a los más caros */
  if (filter === "menor precio") {
    const newOrder = [...properties].sort((a, b) => a.precio - b.precio);
    return newOrder;
  }

  /* filtros de las propiedades más recientes a las más antiguas */
  if (filter === "más recientes") {
    return [...properties].sort((a, b) => {
      return (
        new Date(b.fechaPublicacion).getTime() -
        new Date(a.fechaPublicacion).getTime()
      );
    });
  }

  /* filtro de las propiedades menos recientes a las más recientes */
  if (filter === "menos recientes") {
    return [...properties].sort((a, b) => {
      return (
        new Date(a.fechaPublicacion).getTime() -
        new Date(b.fechaPublicacion).getTime()
      );
    });
  }

  /* filtro de las propiedades con más habitaciones a las que tienen menos habitaciones */
  if (filter === "más habitaciones") {
    const newOrder = [...properties].sort(
      (a, b) => b.habitaciones - a.habitaciones
    );
    return newOrder;
  }

  /* filtro de las propiedades con menos habitaciones a las que tienen más habitaciones */
  if (filter === "menos habitaciones") {
    const newOrder = [...properties].sort(
      (a, b) => a.habitaciones - b.habitaciones
    );
    return newOrder;
  }

  /* retorno de las propiedades normales sin filtro */
  return properties;
};

//Función para buscar por código
export const filterInput = (
  codePropertyInput: string,
  codeProperty: string
) => {
  if (codeProperty === codePropertyInput) {
    return true;
  } else {
    return false;
  }
};
