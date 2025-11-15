//Función para obtener los iconos de las propiedades
export const getPropertyIcon = (tipo: string) => {
  //Utilizamos un record para listar las propiedades y sus iconos
  const icons: Record<string, string> = {
    oficina: "🏢",
    apartamento: "🏬",
    casa: "🏡",
    finca: "🛖",
  };
  return icons[tipo] || "🏠";
};
