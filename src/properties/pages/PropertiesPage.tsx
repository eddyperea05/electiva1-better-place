import { useEffect, useState } from "react";

//import componentes
import { CardPropertyComponent } from "../components/CardPropertyComponent";
import { Filters } from "../filters/Filters";

//import del contexto de los filtros rápidos
import { useDataPropertiesContext } from "../filters/hooks/useDataPropertiesContext";

//import de la función de los filtros
import { filters } from "../filters/functionsFilters";
import { PaginationComponent } from "../components/PaginationComponent";
import { getProperties } from "../../firebase/functions/functionsPropertiesFirebase";

export const PropertiesPage = () => {
  const { typeFastFilter } = useDataPropertiesContext();
  const [filteredProperties, setFilteredProperties] = useState<any>([]);

  const [page, setPage] = useState(0);
  const pageSize = 7;

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getProperties();
      setFilteredProperties(data);
    };
    fetchProperties();
  }, []);

  /* hook para reenderizar los filtros cada vez que se le da click a un filtro */
  useEffect(() => {
    const applyFilters = async () => {
      const allProperties = await getProperties(); // o guarda esto en otro estado si no quieres llamar a Firebase cada vez
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
      <section>
        <Filters />
      </section>
      <section className="flex flex-col">
        {/* contenedor por cada tarjeta */}
        <div className="flex flex-col justify-center items-center md:flex-row md:flex-wrap md:gap-10 mx-5 md:my-6">
          {currentProperties.length !== 0 ? (
            currentProperties.map((property: any) => (
              /* componente de la tarjeta de propiedad */
              <CardPropertyComponent
                key={property.code}
                property={property}
              />
            ))
          ) : (
            <span>No hay propiedades</span>
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
