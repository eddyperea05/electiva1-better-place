//Json de las propiedades
import propertiesJson from "../../json/houses.json";

import { useEffect, useState } from "react";

//import componentes
import { CardPropertyComponent } from "../components/CardPropertyComponent";
import { Filters } from "../filters/Filters";

//import del contexto de los filtros rápidos
import { useDataPropertiesContext } from "../filters/hooks/useDataPropertiesContext";

//import de la función de los filtros
import { filters } from "../filters/functionsFilters";

export const PropertiesPage = () => {
  const { typeFastFilter } = useDataPropertiesContext();
  const [properties, setProperties] = useState(propertiesJson);

  /* hook para reenderizar los filtros cada vez que se le da click a un filtro */
  useEffect(() => {
    const propertiesFilter = filters(typeFastFilter, propertiesJson);
    setProperties(propertiesFilter);
  }, [typeFastFilter]);

  return (
    <div className="md:flex">
      {/* contenedor filtros */}
      <section>
        <Filters />
      </section>
      <section className="flex flex-col justify-center items-center md:flex-row md:flex-wrap md:gap-10 mx-5">
        {/* contenedor por cada tarjeta */}
        {properties.map((house: any) => (
          /* componente de la tarjeta de propiedad */
          <CardPropertyComponent key={house.codigoCasa} property={house} />
        ))}
      </section>
    </div>
  );
};
