//Json de las propiedades
import houses from "../../json/houses.json";

//import componentes
import { CardPropertyComponent } from "../components/CardPropertyComponent";
import { Filters } from "../filters/Filters";

export const OwenershipsPage = () => {
  return (
    <div className="md:flex">
      {/* contenedor filtros */}
      <section>
        <Filters />
      </section>
      <section className="flex flex-col justify-center items-center md:flex-row md:flex-wrap md:gap-10 mx-5">
        {/* contenedor por cada tarjeta */}
        {houses.map((house: any) => (
          /* componente de la tarjeta de propiedad */
          <CardPropertyComponent key={house.codigoCasa} property={house} />
        ))}
      </section>
    </div>
  );
};
