export const PaginationComponent = ({
  page,
  setPage,
  pageSize,
  filteredProperties,
}) => {
  
  //Variable para saber la cantidad de páginas  que hay
  const totalPages = Math.ceil(filteredProperties.length / pageSize);

  //Función para ir directamente a la página
  const goToPage = (pageIndex: number) => {
    setPage(pageIndex);
    //hacemos que el usuario vuelva al inicio de la página
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  //Funcióm para ir a la siguiente página
  const handleNextPage = () => {
    if ((page + 1) * pageSize < filteredProperties.length) {
      setPage((prev: number) => prev + 1);
      //hacemos que el usuario vuelva al inicio de la página
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  //Funcióm para ir a la anterior página
  const handlePrevPage = () => {
    if (page > 0) {
      setPage((prev: number) => prev - 1);
      //hacemos que el usuario vuelva al inicio de la página
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  return (
    <>
      {/* Botón de la siguiente pagina */}
      <div className="flex justify-center gap-4 my-6">
        {page > 0 && (
          <button
            onClick={handlePrevPage}
            className="cursor-pointer px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Anterior
          </button>
        )}

        {/* Botones numerados */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`cursor-pointer px-3 py-1 rounded ${
              i === page
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}

        {/* Botón de la anterior página */}
        {(page + 1) * pageSize < filteredProperties.length && (
          <button
            onClick={handleNextPage}
            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Siguiente
          </button>
        )}
      </div>
    </>
  );
};
