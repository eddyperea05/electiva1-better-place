import { useEffect, useState } from "react";

//import componentes
import { CardPropertyComponent } from "../components/CardPropertyComponent";
import { Filters } from "../filters/Filters";
import { PaginationComponent } from "../components/PaginationComponent";

//import del contexto de los filtros rápidos
import { useDataPropertiesContext } from "../filters/hooks/useDataPropertiesContext";

//import de la función de los filtros
import { filters } from "../filters/functionsFilters";

//import de funciones de firebase
import { getProperties } from "../../firebase/functions/functionsPropertiesFirebase";
import type { PropiedadInterface } from "../types/propertyType";

//import de tipos


export const PropertiesPage = () => {
  //contexto para saber que filtro se elijio
  const { typeFastFilter } = useDataPropertiesContext();

  //Hook para almacenar las propiedades alamcenadas
  const [filteredProperties, setFilteredProperties] = useState<PropiedadInterface[]>([]);

  //Hook para saber el número de la página
  const [page, setPage] = useState<number>(0);

  //Cantida de propiedades que se van a mostrar por página
  const pageSize = 7;

  //Hook para reenderizar las propiedades almacenadas
  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getProperties();
      setFilteredProperties(data);
    };
    fetchProperties();
  }, []);

  //Hook para reenderizar los filtros cada vez que se le da click a un filtro
  useEffect(() => {
    const applyFilters = async () => {
      const allProperties = await getProperties();
      const propertiesFilter = filters(typeFastFilter, allProperties);
      setFilteredProperties(propertiesFilter);
      setPage(0);
    };
    applyFilters();
  }, [typeFastFilter]);

  //Función para calcular la cantidad de páginas que se deben de ver
  const currentProperties = filteredProperties.slice(
    page * pageSize,
    (page + 1) * pageSize
  );

  return (
    <div className="md:flex">
      {/* contenedor filtros */}
      <section className="mt-5 md:mt-0">
        <Filters />
      </section>
      <section className="flex flex-col justify-center w-full">
        {/* contenedor por cada tarjeta */}
        <div className="flex flex-col justify-center items-center mt-5 md:flex-row md:flex-wrap md:gap-10 mx-5">
          {currentProperties.length !== 0 ? (
            currentProperties.map((property: PropiedadInterface) => (
              /* componente de la tarjeta de propiedad */

              <CardPropertyComponent key={property.code} property={property} />
            ))
          ) : (
            <span className="capitalize text-3xl text-[#2A1EFA] font-black">
              no hay propiedades
            </span>
          )}
        </div>
        <PaginationComponent
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          filteredProperties={filteredProperties}
        />
      </section>
    </div>
  );
};
